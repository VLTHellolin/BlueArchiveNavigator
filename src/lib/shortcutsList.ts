import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// Raids abridges
// TA - Total Assult - 总力战
// GA - Grand Assult - 大决战
// LA - Limit Rank Assault - 制约解除作战
// AO - Allied Operation - 联合作战
// JFD - Joint Firing Drill - 联合火力演习

export const shortcutsList = reactive([
  [
    { name: t('game.TA', [t('game.s.jp')]), primary: true },
    { name: t('game.GA', [t('game.s.jp')]), primary: true },
    { name: t('game.LA', [t('game.s.jp')]), primary: true },
    { name: t('game.PVP', [t('game.s.jp')]), primary: true },
    { name: t('game.JFD', [t('game.s.jp')]), primary: true },
    { name: t('game.events', [t('game.s.jp')]), primary: false },
    { name: t('game.studentsRank', [t('game.s.jp')]), primary: false },
  ],
  [
    { name: t('game.TA', [t('game.s.gb')]), primary: true },
    { name: t('game.GA', [t('game.s.gb')]), primary: true },
    { name: t('game.PVP', [t('game.s.gb')]), primary: true },
    { name: t('game.JFD', [t('game.s.gb')]), primary: true },
    { name: t('game.future', [t('game.s.gb')]), primary: true },
    { name: t('game.storeFuture', [t('game.s.gb')]), primary: false },
    { name: t('game.events', [t('game.s.gb')]), primary: false },
    { name: t('game.studentsRank', [t('game.s.gb')]), primary: false },
  ],
  [
    { name: t('game.TA', [t('game.s.cn')]), primary: true },
    { name: t('game.PVP', [t('game.s.cn')]), primary: true },
    { name: t('game.JFD', [t('game.s.cn')]), primary: true },
    { name: t('game.future', [t('game.s.cn')]), primary: true },
    { name: t('game.events', [t('game.s.cn')]), primary: false },
    { name: t('game.studentsRank', [t('game.s.cn')]), primary: false },
  ],
  [
    { name: t('game.newHowTo'), primary: false },
    { name: t('game.teamHowTo'), primary: false },
    { name: t('game.damageHowTo'), primary: false },
    { name: t('game.weeklyHowTo'), primary: false },
    { name: t('game.expTable'), primary: false },
    { name: t('game.giftsTable'), primary: false },
    { name: t('game.earnGems'), primary: false },
    { name: t('game.monthlyGems'), primary: false },
  ],
]);
