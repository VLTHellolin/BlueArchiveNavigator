import axios from 'axios';
import {
  type GamekeeResponse,
  type SchaleDBResponse,
  type Event,
} from './types';
import dayjs, { type Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useI18n } from 'vue-i18n';

dayjs.extend(isBetween);
const { t } = useI18n();

const beginningOfTheDay = (d: Dayjs) =>
  d.hour(0).minute(0).second(0).millisecond(0);
const getNextBirthday = function (month: number, date: number) {
  let birthday = beginningOfTheDay(dayjs())
    .month(month - 1)
    .date(date);
  if (dayjs().isAfter(birthday)) {
    birthday = birthday.add(1, 'y');
  }
  return birthday;
};

const gamekeeAPI = 'https://ba.gamekee.com/v1/activity/query';
const schaleDBAPI = `https://schale.gg/data/${t('lang')}/students.min.json`;

const getEventsFromGamekee = async function () {
  const response = await axios.get<GamekeeResponse>(gamekeeAPI, {
    params: {
      active_at: dayjs().unix(),
    },
    headers: {
      'game-alias': 'ba',
    },
  });
  const result = response.data.data.map((e): Event => {
    return {
      name: e.title,
      picture: e.picture || undefined,
      begin: dayjs.unix(e.begin_at),
      end: dayjs.unix(e.end_at),
      server: ['日服', '国际服', '国服'].indexOf(e.pub_area),
    };
  });
  return result;
};

const getBirthdaysFromSchaleDB = async function () {
  const response = await axios.get<SchaleDBResponse>(schaleDBAPI);
  const current = beginningOfTheDay(dayjs());
  const nextWeek = current.add(7, 'd');
  const result = new Array<Event>();
  for (const item of response.data) {
    if (item.Name.includes('(') || item.Name.includes('（')) {
      // Special student
      continue;
    }
    const [bMonth, bDate] = item.Birthday.split('/');
    const nextBirthday = getNextBirthday(parseInt(bMonth) - 1, parseInt(bDate));

    if (nextBirthday.isBetween(current, nextWeek, 'd', '[)')) {
      for (const server in item.IsReleased) {
        if (item.IsReleased[server]) {
          result.push({
            name: t('home.events.birthday', [item.Name]),
            begin: nextBirthday,
            end: nextBirthday.add(1, 'd').subtract(1, 's'),
            server: parseInt(server),
          });
        }
      }
    }
  }
  return result;
};

export const getEvents = async function () {
  const events = await getEventsFromGamekee();
  const birthdays = await getBirthdaysFromSchaleDB();
  return events.concat(birthdays).sort((a, b) => a.begin.diff(b.begin));
};
