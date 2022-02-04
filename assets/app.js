
// Drag And Drop
function start(e){
    e.dataTransfer.effectAllowed="move";
    e.dataTransfer.setData("text" , e.target.getAttribute('id'));
}

function over(e){
    e.currentTarget.className= 'hovered';
    return false;
    // e.preventDefault();
}


function drop(e){
    ob=e.dataTransfer.getData('text');
    e.currentTarget.appendChild(document.getElementById(ob));

    e.currentTarget.className= '';
    e.stopPropagation();
    let url = document.querySelector("img").src;
    document.querySelector('#image_id').value = url
    document.querySelector("#trashForm").submit()
}

function leave(e){
    e.currentTarget.className= '';
}


//Deconnection

function disco(){
    document.cookie = "pseudo=; expires=Mon, 02 Oct 2000 01:00:00 GMT; path=/";
}


// copié collé


function copyToClipB(e){
    console.log(e.currentTarget.src);
    navigator.clipboard.writeText('');
    navigator.clipboard.writeText(e.currentTarget.src);
    document.querySelector('.copied').className += ' anim_cpied';
    setTimeout(copiedReset, 500)

}





function copiedReset(){
    document.querySelector('.copied').className = 'copied';

}

function deletedReset(){
    document.querySelector('.deleted').className = 'deleted';
}
