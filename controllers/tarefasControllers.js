const conexao = require('../db/conexao')

exports.criarTarefas = (req,res) => {  //cria tarefa
    const { titulo, descricao, } = req.body
    
        conexao.query(
            'INSERT INTO Tarefas (titulo, descricao ) VALUES (?,?)',
            [
                titulo,
                descricao,
              
            ],
            (err) => {
                console.log(err)
                res.status(201).send('Tarefa cadastrado com sucesso!')
        }
    )
}

exports.listarTarefas = (req,res) => {    //lista tarefa
    conexao.query('SELECT * FROM  Tarefas', (err, results) => {
        console.log(err)
        if (err) {
            res.status(500).send('Erro ao buscas Tarefas')
        }
    
            res.status(200).send(results)
    })
}
exports.filtrarTarefas = (req,res) => {    //lista tarefa
    const { status } = req.query

    conexao.query('SELECT * FROM  Tarefas WHERE status = ? ' ,[status], (err, results) => {
        console.log(err)
        if (err) {
            res.status(500).send('Erro ao buscas Tarefas')
        }
    
            res.status(200).send(results)
    })
}

exports.atualizarTarefas = (req, res) => {  //atualiza a tarefa
    const { id } = req.params;
    const {titulo, descricao, status} = req.body;

            let data_conclusao = null
            if (status === "concluida") {
                data_conclusao= new Date ();
            }

    const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ?, data_conclusao = ? WHERE id = ?';//
        
    conexao.query(query, [titulo, descricao, status, data_conclusao, id], (err, results) => {
        if (err) return res.status(500).send('Erro ao atualizar');
        if (results.affectedRows === 0) return res.status(404).send('tarefa não encontrada');
        res.send('tarefa atualizada com sucesso');
    })

}

exports.deletarTarefas = (req, res)=>{  //deleta a tarefa
    const { id } = req.params;
      
    conexao.query('DELETE FROM tarefas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erro ao deletar');
        if (results.affectedRows === 0) return res.status(404).send('Tarefa não encontrada');
        res.status(200).send('Tarefa deletada com sucesso');
    })
}

