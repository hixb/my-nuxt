/**
 * 表示取出enum中所有的值
 */
type ValueOfEnum<T> = T[keyof T];
