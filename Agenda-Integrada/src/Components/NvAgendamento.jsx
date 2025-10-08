function NvAgendamento(){
    const handleClick = () =>{
        console.log("Novo Agendamento");
    };

    return(
        <div className="button">
            <button onClick={handleClick}>Novo Agendamento</button>
        </div>
    );
}

export default NvAgendamento;