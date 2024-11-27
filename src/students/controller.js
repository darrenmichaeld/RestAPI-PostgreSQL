const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req,res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getStudentsById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudents = (req, res) => {
    const {name, email, age, dob} = req.body;

    pool.query(queries.checkEmailExist, [email], (error, results) => {
        if (results.rows.length){
            res.send("Email already Exist");
        }
    })

    pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
        if (error) throw error;
        res.status(201).send("Students Created Successfully");
    });
}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        const studentNotFound = !results.rows.length;
        if (studentNotFound) {
            res.send("Student Cannot be Found");
        }
        pool.query(queries.deleteStudent, [id], (error, results)=>{
            if (error) throw error;
            res.status(200).send("Student Removed Successfully")
        })
    })
}  

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;

    pool.query(queries.getStudentsById, [id], (error, results) => {
        const studentNotFound = !results.rows.length;
        if (studentNotFound) {
            res.send("Student Cannot be Found");
        }

        pool.query(queries.updateStudent, [name, id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Student Updated Successfully")
        })
    })
}

module.exports = {
    getStudents,
    getStudentsById,
    addStudents,
    deleteStudent,
    updateStudent
}