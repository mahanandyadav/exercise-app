import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Exercise = props => {
    return (<tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={'/edit/' + props.exercise._id}> edit</Link> | <a href='#' onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>)
}

export default class ExerciseList extends Component {
    constructor(props) {
        super(props)
        this.deleteExercise = this.deleteExercise.bind(this)
        this.state = { exercise: [] }
    }
    componentDidMount() {
        fetch('http://localhost:5000/exercises/', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    exercise: [...data]
                })
                console.log(data)
            })
            .catch((err) => console.log('error: ' + err))

    }
    deleteExercise(id) {
        console.log(id)
        console.log(this.state.exercise)
        fetch('http://localhost:5000/exercises/'+id, {
            method: 'DELETE',
            // headers: { 'Content-type': 'application/json' },
            body: id
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch((err) => console.log('error: ' + err))
        this.setState({
            exercise: this.state.exercise.filter(item => item._id !== id)

        })
    }
    exerciseList() {
        return this.state.exercise.map(currentExercise => {
            return (<Exercise
                exercise={currentExercise}
                deleteExercise={this.deleteExercise}
                key={currentExercise._id}
            />)
        })     
    }
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}