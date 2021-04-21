import React, {useState} from 'react';
import './UploadPage.scss';
import globals from "../../globals";
import {Link} from "react-router-dom";

const UploadPage = () => {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(null);

    const doUpload = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)

        setDone(null)
        setLoading(true);

        fetch(`${globals.API_URL}/upload-report`, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(res.status) {
                    event.target.reset()
                    setLoading(false)
                    setDone({success: true, listing: data.get('listing')})
                } else {
                    setDone({success: false})
                }
            })
            .catch(err => {
                setLoading(false)
                setDone({success: false})
            })
    }

    return (
        <div className="UploadPage">
            <div className="container">
                <h1>Carica nuova lista</h1>

                <form onSubmit={doUpload}>
                    <div className="form-group">
                        <label htmlFor="listingName">Nome lista</label>
                        <input type="text" className="form-control" id="listingName"
                               placeholder="Inserisci nome lista" name="listing" readOnly={loading}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Carica report</label>
                        <input type="file" className="form-control-file" id="reportFile" name="report" readOnly={loading}/>
                        <small id="fileHelp" className="form-text text-muted">Sono supportati solo i file report in formato PDF</small>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>Carica</button>
                    {loading && (<span>Caricamento...</span>)}

                    {done && (done.success ? (
                        <div className="alert alert-success">
                            <strong>Caricamento avvenuto con successo!</strong> Il report è stato caricato nella lista <i>{done.listing}</i>, <Link to="/dashboard">clicca qui</Link> per tornare alla dashboard
                        </div>
                    ) : (
                        <div className="alert alert-danger">
                            <strong>Ops!</strong> Qualcosa è andato storto nel caricamento! Riprova o contatta l'assistenza.
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default UploadPage;
