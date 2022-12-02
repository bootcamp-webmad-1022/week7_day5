import { useState, useEffect } from "react"
import CoastersList from "../../components/CoastersList/CoastersList"
import Loader from "../../components/Loader/Loader"
import coastersService from "../../services/coasters.service"
import { Container, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import NewCoasterForm from './../../components/NewCoasterForm/NewCoasterForm'

const CoastersListPage = () => {

    const [coasters, setCoasters] = useState()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const loadCoasters = () => {
        coastersService
            .getCoasters()
            .then(({ data }) => setCoasters(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadCoasters()
    }, [])

    return (

        <>
            <Container>
                <h1>Galería de montañas rusas</h1>
                <Button onClick={openModal} variant="dark" size="sm">Crear nueva</Button>
                <hr />
                {!coasters ? <Loader /> : <CoastersList coasters={coasters} />}
                <hr />
                <Link to="/">
                    <Button variant="dark">Volver a inicio</Button>
                </Link>
            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva montaña rusa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCoasterForm closeModal={closeModal} refreshList={loadCoasters} />
                </Modal.Body>
            </Modal>

        </>


    )
}

export default CoastersListPage