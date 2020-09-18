export const actions = {
  SET_STEP: (ctx: any, step: number): any => {
    ctx.commit('setStep', step);
  },
  SET_EDITED: (ctx: any, edited: boolean): any => {
    ctx.commit('setEdited', edited);
  },
  SET_VALID_FORM: (ctx: any, valid: boolean): any => {
    ctx.commit('setValidForm', valid);
  },
  SET_GAS_STATUS: (ctx: any, status: number): any => {
    ctx.commit('setGasStatus', status);
  },
  SET_WOOD_LEVEL: (ctx: any, level: number): any => {
    ctx.commit('setWoodLevel', level);
  }
};

export default actions;
