function Task(id, name, finalized){
    this.id = id;
    this.name = name;
    this.finalized = finalized;

    return {
        id: id,
        name: name,
        finalized: finalized
    };
}

export default Task;