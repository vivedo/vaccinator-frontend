import React, {useState} from 'react';
import './UploadPage.scss';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {uploadReport} from "../../services/reportService";
import {useAuth} from "../../auth";


const UploadPage = () => {
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(null)

    const [formListing, setFormListing] = useState(null)
    const [formReport, setFormReport] = useState(null)

    const auth = useAuth()

    const doUpload = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)

        setDone(null)
        setLoading(true);

        // TODO: move error parsing into service
        uploadReport(data, auth)
            .then(res => {
                if(res.status) {
                    event.target.reset()
                    setLoading(false)
                    setDone({success: true, listing: data.get('listing')})
                } else {
                    setLoading(false)
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
                               placeholder="Inserisci nome lista" name="listing" readOnly={loading} required={true}
                               onChange={(e) => {setFormListing(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Carica report</label>
                        <input type="file" className="form-control-file" id="reportFile" name="report" readOnly={loading} required={true}
                               onChange={(e) => {setFormReport(e.target.value)}}/>
                        <small id="fileHelp" className="form-text text-muted">Sono supportati solo i file report in formato PDF</small>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading || !formListing || !formReport}>Carica</button>
                    {loading && (
                        <div className="loading">
                            <FontAwesomeIcon icon={faSpinner} pulse />
                            <span>Carico...</span>
                        </div>
                    )}

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
