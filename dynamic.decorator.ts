/*
  Based on: https://dev.to/angular/decorators-do-not-work-as-you-might-expect-3gmj
  Meant to be used in conjunction with @Input()
*/
// Can't export as a const lambda, AOT compilation would break.
export function Dynamic<T>(instanceCallbackName: keyof T): any {
  return (target: Object, propName: string | symbol) => {
    const key = Symbol();
    return {
      get() {
        return this[key];
      },
      set(newVal: any) {
        const prevVal = this[key];
        if (prevVal !== newVal) {
          this[key] = newVal;
          this[instanceCallbackName](prevVal, newVal);
        }
      }
    };
  };
}
