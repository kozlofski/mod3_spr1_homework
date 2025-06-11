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

interface Dict<T> {
    [k: string]: T
}

// Array.prototype.map, but for Dict
function mapDict<Input, Output>(
    inputObject: Dict<Input>,
    mappingFunction: (value: Input) => Output
): Dict<Output> {
    const outputObject: Dict<Output> = {}
    for (const inputKey in inputObject) {
        outputObject[inputKey] = mappingFunction(inputObject[inputKey])
    }
    return outputObject
}

function mappingFunction1<T>(inputValue: T): T & { addedProperty: string } {
    return { ...inputValue, addedProperty: 'addedValue' }
}

function mappingFunction2<T>(inputValue: T): T {
    if (
        inputValue &&
        typeof inputValue === 'object' &&
        'age' in inputValue &&
        typeof inputValue.age === 'number'
    )
        return { ...inputValue, age: inputValue?.age + 10 }
    return inputValue
}

console.log(
    'Cars objects with added property:',
    mapDict(cars, mappingFunction1)
)
console.log(
    'Students with their ages increased by 10:',
    mapDict(students, mappingFunction2)
)

// Array.prototype.filter, but for Dict
function filterDict<InputType>(
    inputObject: Dict<InputType>,
    filteringFunction: (value: InputType) => boolean
): Dict<InputType> {
    const outputObject: Dict<InputType> = {}
    for (const inputKey in inputObject) {
        if (filteringFunction(inputObject[inputKey]))
            outputObject[inputKey] = inputObject[inputKey]
    }
    return outputObject
}

function filteringFunction1<Input>(inputValue: Input): boolean {
    if (
        inputValue &&
        typeof inputValue === 'object' &&
        'age' in inputValue &&
        typeof inputValue.age === 'number' &&
        inputValue.age >= 21
    )
        return true
    return false
}

console.log(
    'Students with age larger than/equal 22:',
    filterDict(students, filteringFunction1)
)

// Array.prototype.reduce, but for Dict
function reduceDict<InputType, AccumulatorType>(
    inputObject: Dict<InputType>,
    reducerFunction: (
        element: InputType,
        accumulator: AccumulatorType
    ) => AccumulatorType,
    initialValue: AccumulatorType
): AccumulatorType {
    let accumulator: AccumulatorType = initialValue
    for (const inputKey in inputObject) {
        accumulator = reducerFunction(inputObject[inputKey], accumulator)
    }
    return accumulator
}

function reduceFunction1<InputType>(
    inputValue: InputType,
    accumulator: number
): number {
    if (
        inputValue &&
        typeof inputValue === 'object' &&
        'price' in inputValue &&
        typeof inputValue.price === 'number'
    )
        return accumulator + inputValue.price
    return 0
}

console.log('Total price of cars:', reduceDict(cars, reduceFunction1, 0))
