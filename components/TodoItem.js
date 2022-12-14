const TodoItem = (props) => {
    return props.items.map((value, index) => {
        return <div className="item" key={index}>
            <div className="flex">
                <div className="relative">
                    <input type="checkbox" id='c1'/>
                    <label className="text-light-veryDarkGrayishBlue ml-8 inline align-middle" htmlFor="c1">{value.name}</label>
                </div>
                <button className="delete">&#x2715;</button>
            </div>
        </div>
    })
}

export default TodoItem;