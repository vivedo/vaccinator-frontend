import React, {useEffect, useState} from 'react'
import './DashboardPage.scss'
import {Link} from "react-router-dom";
import DashboardStats from "../DashboardStats/DashboardStats";
import {getListingsAndStats} from "../../services/listingsService";
import {useAuth} from "../../auth";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const DashboardPage = () => {
    const [stats, setStats] = useState() // {listings: 0, entries: 0, scanned: 0}
    const [listings, setListings] = useState([])
    const auth = useAuth()

    useEffect(() => {
        loadDashboardData()
    }, [])

    return (
        <div className="DashboardPage">
            <div className="container">
                <h1>Dashboard</h1>

                <DashboardStats stats={{...stats, listings: listings.length}} showListings={true}/>

                <h2>Liste</h2>

                <ul className="listings">
                    {listings.map((listing, key) => (
                        <li key={key}>
                            <Link to={`/list/${listing.listing_id}`}>
                            {listing.listing_name}
                            <small><FontAwesomeIcon icon={faUpload}/> {listing.insertion_date.getDate()}/{listing.insertion_date.getMonth()+1}/{listing.insertion_date.getFullYear()}</small>
                            </Link>
                        </li>
                    ))}
                </ul>

                {listings.length === 0 ? (
                    <div>
                      Non sono presenti liste. <Link to="/upload">Clicca qui</Link> per caricarne una
                    </div>
                ) : <></>}

            </div>
        </div>
    )

    function loadDashboardData() {
        getListingsAndStats(auth)
            .then(res => {
                setListings(res.listings)
                setStats(res.stats)
            })
            .catch(err => {
                // TODO: handle errors
            })
    }
}

export default DashboardPage
