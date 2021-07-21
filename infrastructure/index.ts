export function log(value: string | Array<any> | Object) {
  if ('string' == typeof value) {
    console.log(value);
    return;
  }

  if (Array.isArray(value)) {
    console.table(value);
    return;
  }

  console.dir(value);
}
