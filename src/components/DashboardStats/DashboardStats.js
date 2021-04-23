import React from 'react';
import './DashboardStats.scss';

const DashboardStats = (props) => (
    <div className="DashboardStats">
        <div className="row">
            {props.showListings && (
                <div className="col">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h2 className="card-title">{props.stats && props.stats.hasOwnProperty('listings') ? props.stats.listings : '--'}</h2>
                            <p className="card-text">Liste caricate</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="col">
                <div className="card text-white bg-warning mb-3">
                    <div className="card-body">
                        <h2 className="card-title">{props.stats && props.stats.hasOwnProperty('entries') ? props.stats.entries : '--'}</h2>
                        <p className="card-text">Prenotazioni totali</p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                        <h2 className="card-title">{props.stats && props.stats.hasOwnProperty('scanned') ? props.stats.scanned : '--'}</h2>
                        <p className="card-text">Prenotazioni confermate</p>
                    </div>
                </div>
            </div>
            {props.showRemaining && (
                <div className="col">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h2 className="card-title">
                                {props.stats && props.stats.hasOwnProperty('entries') && props.stats.hasOwnProperty('scanned') ?
                                    (props.stats.entries - props.stats.scanned) : '--'}
                            </h2>
                            <p className="card-text">Prenotazioni rimanenti</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="col">
                <div className="card text-white bg-danger mb-3">
                    <div className="card-body">
                        <h2 className="card-title">{
                            (props.stats && props.stats.hasOwnProperty('scanned') && props.stats.entries != 0) ? `${Math.round((props.stats.scanned / props.stats.entries * 10000))/100}%` : '--'
                        }</h2>
                        <p className="card-text">Rapporto presenze/prenotazioni</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default DashboardStats;
