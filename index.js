import {h, app} from "https://unpkg.com/hyperapp"

// Actions

const UpdateNewNumber = (state, event) => ({
    ...state,
    newNumber: event.target.value
});

const AddNewNumber = state => ({
    numbers: state.numbers.concat(parseFloat(state.newNumber)),
    newNumber: null,
    sum: null
});

const FindSum = state => ({
    ...state,
    numbers: [],
    sum: state.numbers.reduce((sum, item) => item + sum)
});

// View

const NumbersList = state => h("div", {}, [
    h("p", {}, `Numbers for summing: ${state.numbers.join(", ")}`),
    h("input", { onChange: UpdateNewNumber, value: state.newNumber }),
    h("button", { onClick: AddNewNumber }, "Add")
]);

const SumReadout = sum => h("div", {}, [
    h("p", {}, sum === null ?
        "Press 'Calculate'!" :
        `Sum: ${sum}`),
    h("button", { onClick: FindSum }, "Calculate")
]);

const View = state => h("div", {}, [
    NumbersList(state),
    SumReadout(state.sum)
]);

// State

const InitState = ({
    numbers: [],
    newNumber: null,
    sum: null
});

// Initialize app    
app({
    node: document.getElementById("app"),
    view: View,
    init: InitState
});