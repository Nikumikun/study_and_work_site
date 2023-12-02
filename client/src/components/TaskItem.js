import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {TASKPAGE_ROUTE} from "../utils/consts";

const TaskItem = observer(({task}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const click = async () => {
        localStorage.setItem('TaskId',task.TaskId)
        navigate(TASKPAGE_ROUTE + '/' + task.TaskId)
    }
    return (
        <div className="p-2 align-items-center">
            {user.users.userroleUserRoleId == 1 ? 
            <Card style={{cursor:'pointer',borderColor:"orange",
            backgroundColor:"lightyellow"}}
            onClick={click}>
                <div>{{... task}.taskstatus.Name} | {{... task}.taskrole.Name} | {{... task}.taskcategory.Name}</div>
                <div> Id заказчика: {task.UserIdCreateTask} | Id автора:{task.UserIdTakeTask}</div>
                <div>
                    {task.Name}
                </div>
                <div>
                    {task.Description}
                </div>
                <div>{task.Price} руб.</div>
            </Card>
            :
            <div>
            {task.taskstatusTaskStatusId == undefined ? 
            <div></div>
            :
            <div>
                { {... task}.taskstatus.Name == "Выполнено" ?
                <div></div>
                :
                <div>
                    {user.users.userroleUserRoleId == 3 && {... task.taskstatus}.Name == "Ожидание" ?
                        <Card style={{cursor:'pointer',borderColor:"orange",
            backgroundColor:"lightyellow"}}
            onClick={click}>
                <div>{{... task}.taskstatus.Name} | {{... task}.taskrole.Name} | {{... task}.taskcategory.Name}</div>
                <div>
                    {task.Name}
                </div>
                <div>
                    {task.Description}
                </div>
                <div>{task.Price} руб.</div>
            </Card>
                    :
                    <div>
                        {user.users.UserId !== undefined ?
                        <div>
                            { task.UserIdCreateTask == user.users.UserId  || task.UserIdTakeTask == user.users.UserId ?
                            <Card style={{cursor:'pointer',borderColor:"orange",
                        backgroundColor:"lightyellow"}}
                        onClick={click}>
                            <div>{{... task}.taskstatus.Name} | {{... task}.taskrole.Name} | {{... task}.taskcategory.Name}</div>
                            <div>
                                {task.Name}
                            </div>
                            <div>
                                {task.Description}
                            </div>
                            <div>{task.Price} руб.</div>
                        </Card>
                        :
                        <div></div>
                        }
                        </div> :
                        <div>
                            <Card style={{borderColor:"orange",
                        backgroundColor:"lightyellow"}}>
                            <div>{{... task}.taskstatus.Name} | {{... task}.taskrole.Name} | {{... task}.taskcategory.Name}</div>
                            <div>
                                {task.Name}
                            </div>
                            <div>
                                {task.Description}
                            </div>
                        </Card>
                        </div>
                        }
                    </div>}
                </div>
                
                }
            </div>
            
            }</div>
            }
            
        </div>

    );
});

export default TaskItem;