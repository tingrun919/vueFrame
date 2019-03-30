

export const PAGE_SIZE = 10;
// input 长度
export const INPUT_SIZE = 30;
// input english 长度
export const INPUT_ENGLISH_SIZE = 80;
// textarea 长度
export const TAREA_SIZE = 300;

export const INPUT_NUMBER_SIZE = 6;

// 字典项前缀
export const DICT_PREFIX = 'DICT_';

// 手机号码验证
export const phoneReg = /^1[3456789]\d{9}$/;
 
//排序 数字
export const sortReg = /^\d+$/;

// 数量 不等于0 数字
export const numReg = /^(?!0)\d+$/;
 


export default {
  PAGE_SIZE,
  INPUT_SIZE,
  INPUT_ENGLISH_SIZE,
  INPUT_NUMBER_SIZE,
  DICT_PREFIX,
  phoneReg,
  saleReg,
  sortReg,
  numReg,
  
};
