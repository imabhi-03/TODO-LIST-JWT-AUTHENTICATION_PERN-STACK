import React, {Fragment, useState} from "react";



const EditTodo = ({todo, setTodosChange}) => 
{  
  const myHeaders= new Headers();
  
  myHeaders.append("Content-Type" ,"application/json");
  myHeaders.append("jwtToken",localStorage.token);
   
    const[description,setDescription] =useState(todo.description);
    const[isModalOpen, setIsModalOpen]= useState(false);

    const toggleModal = () =>
    {
        setIsModalOpen(!isModalOpen);
        setDescription(todo.description);
    }

    const editText = async (id) =>
      {
          try {
                const body= {description};
                  await fetch(`http://localhost:5000/dashboard/todos/${id}`,
                  {
                    method:"PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body)
                  }
                );
                toggleModal();
                setTodosChange(true);
            
                
          } catch (err) {
              console.error(err.message);
          }
      }

    return <Fragment>
        <button type="button" className="btn btn-warning"  onClick={toggleModal}>
  Edit
</button>

{isModalOpen && (
    <div className="modal" id="myModal" style={{display:"block"}} tabIndex="-1" role="dialog">


  <div className="modal-dialog" role="document">
    <div className="modal-content">

    
      <div className="modal-header" >
        <h4 className="modal-title">Edit Todo</h4>
        <button type="button" className="btn-close" onClick={toggleModal}></button>
      </div>

      <div className="modal-body">
        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        
      </div>
      
    
      
      <div className="modal-footer">
      <button type="button" className="btn btn-warning" onClick={()=> editText(todo.todo_id)}>Edit</button>
        <button type="button" className="btn btn-danger"  onClick={toggleModal}>Close</button>
      </div>

    </div>
  </div>
</div>
)}
    </Fragment>
};

export default EditTodo;