tareas();
function tareas() {
    fetch('/users',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
               if(element.gender=="masculino") {
           var gender = `<button class="male"><i class="fas fa-male"></i> Masculino</button>`
           } else {
           var gender = `<button class="female"><i class="fas fa-female"></i> Femenino</button>`
            }

            filas = filas + `<tr>
           <td>${element.username}</td>
           <td>${element.name}</td>
           <td>${element.lastName}</td>
           <td>${element.email}</td>
            <td>${gender}</td>
            <td>${element.space} MB</td>
            <td>${element.available} MB</td>
           <td>
            <a href="/users/${element._id}" class="delete"><button><i class="fa fa-trash"></i> Eliminar</button></a>
            </td>
           </tr>`
            });
            document.querySelector("#filas").innerHTML = filas;
            let btn_delete = document.querySelectorAll('.delete');
            btn_delete.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    //peticion para eliminar
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .then(response => {
                            alert("Usuario eliminado con exito.");
                            tareas();
                        })
                        .catch(err => {
                            alert("Ocurrio un error al eliminar el usuario");
                            console.log(err);
                        });
                });
            })
        })
}