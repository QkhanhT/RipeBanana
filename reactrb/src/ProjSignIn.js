import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import './ProjSignIn.css';
import MyButton from './Button';

function ProjSignin() {
    const [inputName, setName] = useState('');
    const [inputDesc, setDesc] = useState('');
    const [inputProjID, setProjID] = useState('');
    const [existProjID, setExistID] = useState('');
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate();
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleProjIDChange = (event) => {
        setProjID(event.target.value);
    };

    const handleExistIDChange = (event) => {
        setExistID(event.target.value);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputName, inputDesc, inputProjID }),
        }
        fetch('/dashboard/create', requestData)
        .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data)
            if(data.code == 400){
                setErrMessage("The project with ID " + inputProjID + " already exists!")
                setError(true)
            }
            else{
                setError(false)
                navigate('/dashboard', {
                    state: {
                        project : data.project,
                        setsList: data.sets
                    }
                })
            }
        });
    };

    const handleExistSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ existProjID }),
        }
        fetch('/dashboard/join', requestData)

        .then((response) => response.text())
        .then(function(data){
            data = JSON.parse(data)
            if(data.code == 400){
                if(data.message == "project_not_found"){
                    setErrMessage("Project doesn't exist!")
                }
                else{
                    setErrMessage(existProjID + " is incorrect!")
                }
                setError(true)
            }
            else{
                setError(false)
                navigate('/dashboard', {
                    state: {
                        project : data.project,
                        setsList: data.sets
                    }
                })
            }
        });
    };

    const errorMessage = () => {
        return(
            <div style={{
                display: error ? '' : 'none',
            }}>
                <p>{errMessage}</p>
            </div>
        )
    }

    return (
        <div className="new-exist-project">
            <div className="projsignin-header">
                <h1>Join/Create Project</h1>
            </div>
            <div className="create-join-container">
                <div className="projjoin-container">
                    <div className="projjoin-header">
                        <h1>Join Existing Project</h1>
                    </div>
                    <form onSubmit={handleExistSubmit}>
                    <div className="create-join-input">
                            <label>ProjectID</label>
                            <input
                            type="text"
                            value={existProjID}
                            onChange={handleExistIDChange}
                            placeholder="Ex: 1234"
                            />
                        </div>
                        <div>
                            <button className="projsignin-buttons" type="submit">Join</button>
                        </div>
                    </form>
                </div>
                <h2>Or</h2>
                <div className="projcreate-container">
                    <h1>Create New Project</h1>
                    <form onSubmit={handleCreateSubmit}>
                        <div className="create-join-input">
                            <label>Name</label>
                            <input
                            type="text"
                            value={inputName}
                            onChange={handleNameChange}
                            placeholder="Ex: Project1"
                            />
                        </div>
                        <div className="create-join-input">
                            <label>Description</label>
                            <input
                            type="text"
                            value={inputDesc}
                            onChange={handleDescChange}
                            placeholder="Ex: This is a project"
                            />
                        </div>
                        <div className="create-join-input">
                            <label>ProjectID</label>
                            <input
                            type="text"
                            value={inputProjID}
                            onChange={handleProjIDChange}
                            placeholder="Ex: 1234"
                            />
                        </div>
                        <div>
                            <button className="projsignin-buttons" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                {errorMessage()}
            </div>
            <div>
                <button className="projsignin-logoff-button" label="Log Off" onClick={() => navigate('/')}>Log Off</button>
            </div>
        </div>
    )
}

export default ProjSignin;