import faker from "faker"

export const sleep = (someFunction) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(someFunction())
    }, faker.datatype.number(100))
  })
}
