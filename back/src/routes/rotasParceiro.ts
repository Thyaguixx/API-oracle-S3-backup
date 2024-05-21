import express from 'express';
import { atualizarCursosParceiro, atualizarCursosParceiroPorIsCursoFeito, cadastrarNovaExpertiseParceiro, GETCursoExpertisesParceiro, GETExpertisesPorcentagem, GETParceiroByID, GETParceiros, GETParceirosNomeId, GETQuantidadeParceiro, SETParceiro } from '../services/parceiroServices';

const routerParceiro = express.Router();

routerParceiro.get('/GETParceirosNomeId', async (req, res) => {

    const result = await GETParceirosNomeId()
   
    if (result && result.Sucesso) {
        const parceiros = result.retornoParceiros
        res.send({ Sucesso: true, Parceiros: parceiros})
    } else {
        res.send({ msg: "Erro ao buscar parceiros.", Erro: result })
    }
});

routerParceiro.post('/GETCursoExpertisesParceiro', async (req, res) => {
    const idParceiro = req.body.IdParceiro
    const idExpertise = req.body.IdExpertise

    const result = await GETCursoExpertisesParceiro(idParceiro, idExpertise)
   
    if (result && result.Sucesso) {
        const parceiroExpertiseCursos = result.parceiroExpertiseCursos
        res.send({ Sucesso: true, parceiroExpertiseCursos: parceiroExpertiseCursos})
    } else {
        res.send({ msg: "Erro ao buscar Os cursos da expertise e do parceiro.", Erro: result })
    }
});

routerParceiro.get('/GetParceiroQuantidade', async (req, res) => {

    const result = await GETQuantidadeParceiro()
   
    if (result && result.Sucesso) {
        const quantidadeParceiros = result.retornoParceiros
        res.send({ Sucesso: true, QuantidadeParceiros: quantidadeParceiros})
    } else {
        res.send({ msg: "Erro ao buscar parceiro.", Erro: result })
    }
});

routerParceiro.get('/GETExpertisesPorcentagem/:id', async (req, res) => {
    const { id } = req.params

    const result = await GETExpertisesPorcentagem(id)
   
    if (result && result.Sucesso) {
        const expertise = result.expertisePorcentagens
        res.send({ Sucesso: true, ExpertisePorcentagem: expertise})
    } else {
        res.send({ msg: "Erro ao buscar expertise.", Erro: result })
    }
});

routerParceiro.post('/atualizarCursosParceiro', async (req, res) => {
    const idParceiro = req.body.idParceiro;
    const idExpertise = req.body.idExpertise;
    const novosCursos = req.body.novosCursos;

    const resultado = await atualizarCursosParceiro(idParceiro, idExpertise, novosCursos);

    if (resultado.Sucesso) {
        res.send({ msg: "Cursos adicionados com sucesso.", Sucesso: resultado.Sucesso });
    } else {
        res.send({ msg: "Erro ao adicionar cursos.", erro: resultado.Erro });
    }
});


routerParceiro.post('/cadastrarParceiro', async (req, res) => {
    const retorno = await SETParceiro(req.body.dadosParceiro)
    const parceiro = retorno?.Retorno
    console.log(parceiro?.nome)
    if (retorno?.Sucesso) {
        res.send({ msg: "Parceiro cadastrado com sucesso.", Sucesso: retorno.Sucesso, retornoUsuario: retorno.Retorno })
    } else {
        res.send({ msg: "Erro ao cadastrar Parceiro.", erro: retorno?.Erro })
    }
});

routerParceiro.post('/atualizarCursosParceiroPorIsCursoFeito', async (req, res) => {
    const lista = req.body.lista
    const IdParceiro = req.body.IdParceiro
    
    const retorno = await atualizarCursosParceiroPorIsCursoFeito(lista, IdParceiro)

    if (retorno?.Sucesso) {
        res.send({ msg: "Cursos atualizados com sucesso.", Sucesso: retorno.Sucesso })
    } else {
        res.send({ msg: "Erro ao cadastrar Usuario.", erro: retorno?.Erro })
    }
});

routerParceiro.post('/cadastrarExpertiseParceiro', async (req, res) => {
    try {
        const idParceiro = req.body.idParceiro;
        const novasExpertises = req.body.novasExpertises; // Supondo que os dados das novas expertises estejam no corpo da requisição como um array

        await cadastrarNovaExpertiseParceiro(idParceiro, novasExpertises);

        res.status(200).send({ msg: "Expertises cadastradas com sucesso." });
    } catch (error) {
        console.error('Erro ao cadastrar expertises:', error);
        res.status(500).send({ msg: "Erro ao cadastrar expertises.", erro: error });
    }
});

routerParceiro.get('/getParceiroByID/:id', async (req, res) => {
    const { id } = req.params

    const result = await GETParceiroByID(id)

    if (result && result.Sucesso) {
        const parceiro = result.retorno
        res.send({ Sucesso: true, Parceiro: parceiro })
    } else {
        res.send({ msg: "Erro ao buscar parceiro.", Erro: result })
    }
});

routerParceiro.get('/GETParceiros', async (req, res) => {

    const result = await GETParceiros()
   
    if (result && result.Sucesso) {
        const parceiros = result.retornoParceiros
        res.send({ Sucesso: true, Parceiros: parceiros})
    } else {
        res.send({ msg: "Erro ao buscar parceiros.", Erro: result })
    }
});

export default routerParceiro;