// listToDict
// map
// filter
// reduce

// Example for cars
const cars = {
    modelS: { brand: 'Tesla', color: 'white', price: 79999 },
    corolla: { brand: 'Toyota', color: 'silver', price: 20000 },
    mustang: { brand: 'Ford', color: 'red', price: 45000 },
    civic: { brand: 'Honda', color: 'blue', price: 22000 },
    model3: { brand: 'Tesla', color: 'black', price: 39999 },
    beetle: { brand: 'Volkswagen', color: 'yellow', price: 18000 },
}

// Example for students
const students = {
    alice: { age: 20, major: 'Computer Science', gpa: 3.8 },
    bob: { age: 19, major: 'Mathematics', gpa: 3.2 },
    charlie: { age: 21, major: 'History', gpa: 3.5 },
    diana: { age: 22, major: 'Biology', gpa: 3.9 },
    eric: { age: 20, major: 'Psychology', gpa: 3.6 },
    fiona: { age: 19, major: 'Literature', gpa: 3.4 },
}

// Example of nested object
const carsNested = {
    modelS: {
        brand: 'Tesla',
        color: 'white',
        price: 79999,
        engine: { power: '750hp', fuel: 'electric' },
    },
    corolla: {
        brand: 'Toyota',
        color: 'silver',
        price: 20000,
        engine: { power: '120hp', fuel: 'petrol' },
    },
    mustang: {
        brand: 'Ford',
        color: 'red',
        price: 45000,
        engine: { power: '400hp', fuel: 'petrol' },
    },
    civic: {
        brand: 'Honda',
        color: 'blue',
        price: 22000,
        engine: { power: '150hp', fuel: 'hydrogen' },
    },
    model3: {
        brand: 'Tesla',
        color: 'black',
        price: 39999,
        engine: { power: '500hp', fuel: 'electric' },
    },
    beetle: {
        brand: 'Volkswagen',
        color: 'yellow',
        price: 18000,
        engine: { power: '100hp', fuel: 'diesel' },
    },
}

// type Value = number | string;

// interface DictValue<Value> {
//   [k: string]: Value;
// }

// type FilterVal = DictValue<number>;

// type T = number | string | Dict<T>;
interface Dict<T> {
    [k: string]: T
}

// Array.prototype.map, but for Dict
function mapDict<T, U>(
    inputObject: Dict<T>,
    mappingFunction: (objectValue: T, key: string) => U
): Dict<U> {
    const mappedObject: Dict<U> = {}

    Object.keys(inputObject).forEach(
        (key) => (mappedObject[key] = mappingFunction(inputObject[key], key))
    )
    return mappedObject
}

const mappingFunction = <U>(value: Dict<U>) => {
    return { ...value, addedProperty: 'val' }
}

const mappedObject = mapDict(cars, mappingFunction)
console.log(mappedObject)

// Array.prototype.filter, but for Dict
function filterDict<T>(
    inputObject: Dict<T>,
    filteringFunction: (objectValue: T) => boolean
): Dict<T> {
    const filteredObject: Dict<T> = {}

    Object.keys(inputObject).forEach(
        (key) =>
            filteringFunction(inputObject[key]) &&
            (filteredObject[key] = inputObject[key])
    )
    return filteredObject
}

const filteringFunction = <T>(value: Dict<T>): boolean => {
    return typeof value?.price === 'number' && value?.price > 30000
}

const filteredObject = filterDict(cars, filteringFunction)
console.log(filteredObject)

// Array.prototype.reduce, but for Dict
function reduceDict<T, AccumulatorType>(
    inputObject: Dict<T>,
    reduceFunction: (
        accumulator: AccumulatorType,
        objectValue: T
    ) => AccumulatorType,
    initialValue: AccumulatorType
): AccumulatorType {
    let accumulator = initialValue
    Object.keys(inputObject).forEach(
        (key) => (accumulator = reduceFunction(accumulator, inputObject[key]))
    )
    return accumulator
}

const reduceFunction = <T>(accumulator: number, value: Dict<T>): number => {
    if (typeof value?.price === 'number') return accumulator + value?.price
    return accumulator
}

const totalPrice = reduceDict(cars, reduceFunction, 0)
console.log(totalPrice)
