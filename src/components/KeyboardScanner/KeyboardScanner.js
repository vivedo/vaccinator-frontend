import React, {useEffect, useRef, useState} from 'react';
import './KeyboardScanner.scss';
import {Button, Modal} from "react-bootstrap";

const KeyboardScanner = (props) => {
    const [displayModal, setDisplayModal] = useState(false)
    const [entry, setEntry] = useState(null)
    const [code, _setCode] = useState('')
    const codeRef = useRef(code)

    function setCode(code) {
        if(code.length > 16)
            return

        codeRef.current = code;
        _setCode(code);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

    useEffect(() => {
        if(props.entries && props.entries.length) {
            const search = props.entries.filter(entry => code === entry.fc);
            setEntry(search.length ? search[0] : null)
        } else {
            setEntry(null)
        }

    }, [code])

    const handleKeyDown = (e) => {
        if(e.keyCode === 8) {
            setCode(codeRef.current.slice(0, -1))

            if(codeRef.current.length < 1)
                setDisplayModal(false)

            return
        }

        if(e.ctrlKey || e.metaKey || e.altKey)
            return

        const char = String.fromCharCode(e.keyCode)
        if(!/[a-z]+|[A-Z]+|[0-9]+/.test(char))
            return

        setCode(codeRef.current + char)
        setDisplayModal(true)
    }

    function abort() {
        setCode('')
        setDisplayModal(false)
    }

    function confirm() {
        props.onConfirm(entry)
        setCode('')
        setDisplayModal(false)
    }

    return (
        <ScannerModal
            show={displayModal}
            onClose={() => abort()}
            onConfirm={() => confirm()}
            code={code}
            entry={entry}
        />
    )
}

export default KeyboardScanner;

function ScannerModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="KeyboardScannerModal">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Inserimento Codice Fiscale
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1 className="text-center"><code>{props.code}</code></h1>

                {props.entry ? (
                    <>
                        <div className="alert alert-success">
                            Il CF inserito è presente nella lista
                        </div>

                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>Data e Ora</th>
                                <th>Codice</th>
                                <th>Nome</th>
                                <th>Telefono</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{props.entry.entry_date}</td>
                                <td className="text-monospace">{props.entry.code}</td>
                                <td>{props.entry.name}</td>
                                <td>{props.entry.phone}</td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className="alert alert-danger">
                        <strong>Errore!</strong> Il CF inserito non è valido o non è presente in questa lista
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onConfirm} variant="success" disabled={!props.entry}>Conferma presenza</Button>
                <Button onClick={props.onClose} variant="danger">Annulla</Button>
            </Modal.Footer>
        </Modal>
    );
}