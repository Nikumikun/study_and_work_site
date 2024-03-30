import React, {useContext,useEffect,useState} from 'react';
import {Card, Row,Button, ListGroup,Form} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AddTask from "../components/modals/AddTask";
import {fetchSelectedTask, fetchSelectedTaskComments,addComment, updateTaskAndDecision} from "../http/taskApi"
import Decision from '../components/modals/Decision';

function click(TaskId,UserId,Comment){
    try {
        addComment(TaskId,UserId,Comment)
        alert("Комментарий добавлен, обновите страницу задания")
    } catch (error) {
        console.log(error.response.data.message)
    }
    
}

function commentator(CommentatorId,UserIdCreateTask,UserIdTakeTask,AdminRoleId,UserId){
    if (CommentatorId == UserIdCreateTask) {
        const owner = "Заказчик"
        return owner
    } else if (CommentatorId == UserIdTakeTask) {
        const author = "Автор"
        return author
    } else
    {
        const admin = "Админ"
        return admin
    }
}

const TaskPage = observer(() => {
    const {user} = useContext(Context)
    const [Comment, setComment] = useState('')
    const [UpdateTaskVisible,setUpdateTaskVisible] = useState(false)
    const [DecisionVisible,setDicisionVisible] = useState(false)
    
    useEffect(()=>{
        fetchSelectedTask(localStorage.getItem('TaskId')).then(data => user.setSelectedTask(data))
        fetchSelectedTaskComments(localStorage.getItem('TaskId')).then(data => user.setTaskComments(data))
    },[])
    const task = {... user.selectedTask}
    var datatask = {
        'TaskId': task.TaskId,
        'Name': task.Name,
        'Address': task.Address,
        'Price': task.Price,
        'Description': task.Description,
    }
    user.setUpdateTask(datatask)
    return (
            <Card className="m-4" style={{height:window.innerHeight - 60 ,backgroundColor:"lightyellow",borderColor:"orange"}}>
                <Card.Body>
                <Card.Title>
                    <h2>{task.Name}</h2>
                </Card.Title>
                <Card.Text>
                <Row className="m-2">
                    <div>{{... task.taskstatus}.Name} | {{... task.taskrole}.Name} | {{... task.taskcategory}.Name}</div>
                    {user.users.userroleUserRoleId == 1 ?
                        <div>
                        <div>Владелец: {task.UserIdCreateTask}</div>
                        <div>Автор: {task.UserIdTakeTask}</div>
                        </div>
                        :
                        <div></div>
                    }
                </Row>
                <Row className="m-2">
                    Описание: {task.Description}
                </Row>
                <Row className="m-2"> Ссылка на документ:
                {user.users.userroleUserRoleId == 1 ?
                <div>
                    <a href={task.Address}>{""+task.Address}</a>
                </div>
                :
                <div>
                    {user.users.UserId == task.UserIdCreateTask ||  user.users.UserId == task.UserIdTakeTask?
                    <a href={task.Address}>{""+task.Address}</a>
                        :
                    <div></div>
                    }
                </div>
                } 
                    
                    
                </Row>
                <Row className="m-2 align-self-end"> Цена за задание: 
                    {user.users.userroleUserRoleId !== 2 ?
                    <h3>{task.Price} руб.</h3>
                    :
                    <div>
                      {user.users.UserId == task.UserIdCreateTask || user.users.UserId == task.UserIdCreateTask?
                        <h3>{task.Price} руб.</h3>
                        :
                        <div></div>
                    }  
                    </div>
                    
                    }
                    
                </Row>
                <div>
                    {
                        user.users.UserId == task.UserIdCreateTask ?
                        <div>
                        <Button onClick={() => setUpdateTaskVisible(true)} type="primary" variant="warning">Изменить задание</Button>
                        <AddTask show={UpdateTaskVisible} onHide={()=>setUpdateTaskVisible(false)} updatetask={datatask}/>
                        </div>
                        
                        :
                        <div></div>
                    }
                </div>
                <div>
                    {user.users.userroleUserRoleId !== 2  && task.UserIdTakeTask == null ?
                    <Button style={{width: window.innerWidth - 100}} variant="warning" onClick={() => updateTaskAndDecision(task.TaskId,user.users.UserId)}>Взять задание</Button>
                    :
                    <div>
                        { user.users.userroleUserRoleId !== 2  && task.UserIdTakeTask == user.users.UserId ?
                        <div>
                            { task.decision == null ?
                                <div>
                                <Button onClick={() => setDicisionVisible(true)} style={{width: window.innerWidth - 100}} variant="warning"> Прикрепить решение задачи</Button>
                                <Decision show={DecisionVisible} onHide={()=>setDicisionVisible(false)} Task={task.TaskId}/>
                            </div>
                            :
                            <div>
                            </div>
                            }
                            
                        </div>
                        :
                        <div>
                        </div>
                        }
                        <div>
                        { task.decision == null ?
                                <div>
                            </div>
                            :
                            <div>
                                <h3>Решение:</h3>
                                <div>{task.decision.Description}</div>
                                <a href={task.decision.Address}>{task.decision.Address}</a>
                            </div>
                            }        
                        </div>
                    </div>
                    }
                    
                </div>
                <div>
                    {user.users.userroleUserRoleId == 1 ?
                    <div>
                        <div>
                    <Form.Control
                        placeholder="Ваш комментарий"
                        value={Comment}
                        onChange={e => setComment(e.target.value)}
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                    <Button variant={"outline-warning"} style={{color:"black"}} onClick={(()=>click(task.TaskId,user.users.UserId,Comment))}>Оставить коментарий</Button>
                </div>
                <h4>Коментарии:</h4> 
                    <ListGroup>
                        {
                            user.selectedtaskcomments.map(comment =>
                                <div>
                                    {
                                    comment.TaskId == task.TaskId ?
                                
                                <ListGroup.Item key={comment.CommentId} comment={comment}>
                                    {commentator(comment.UserIdSendComment,task.UserIdCreateTask,task.UserIdTakeTask)} пишет:
                                    <div>
                                        "{comment.Comment}"
                                    </div>
                                </ListGroup.Item>
                                :
                                <div></div>
                                }
                                </div>)
                        }
                    </ListGroup>
                    </div>
                    :
                    <div>
                        {user.users.UserId == task.UserIdCreateTask || user.users.UserId == task.UserIdTakeTask ?
                        <div>
                            <div>
                <Form.Control
                    placeholder="Ваш комментарий"
                    value={Comment}
                    onChange={e => setComment(e.target.value)}
                    style={{borderColor:"orange"}}>
                </Form.Control>
                <Button variant={"outline-warning"} style={{color:"black"}} onClick={(()=>click(task.TaskId,user.users.UserId,Comment))}>Оставить коментарий</Button>
            </div>
            <h4>Коментарии:</h4> 
                <ListGroup>
                    {
                        user.selectedtaskcomments.map(comment =>
                            <div>
                                {
                                    comment.TaskId == task.TaskId ?
                                
                                <ListGroup.Item key={comment.CommentId} comment={comment}>
                                    {commentator(comment.UserIdSendComment,task.UserIdCreateTask,task.UserIdTakeTask)} пишет:
                                    <div>
                                        "{comment.Comment}"
                                    </div>
                                </ListGroup.Item>
                                :
                                <div></div>
                                }
                            </div>)
                    }
                </ListGroup>
                </div>
                : <div></div>}  
                </div>
                    }
                </div>
                </Card.Text>
                </Card.Body>
            </Card>
    );
});

export default TaskPage;