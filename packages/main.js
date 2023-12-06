export default {
    variables: {
        storage: {
            local: '`localStorage.setItem(todos-elementhtml) -> getItem(todos-elementhtml)`',
            session: '`sessionStorage.setItem(todos-elementhtml) -> getItem(todos-elementhtml)`'
        },
        defaultCell: 'todos',
        defaults: {
            router: ":|#router",
            transform: '($getCell("todos"))'
        },
        testFunc: (arg1, arg2) => { console.log('main.js: line 8', arg1, arg2); return arg1 + arg2; }
    }
}