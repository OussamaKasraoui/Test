import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link } from 'react-router-dom';


export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            etudiant: 0,
            professeur: 0,
            module : 0
        }
    }

    getCount(table){
        let count;

        table.instance.then(response => response.body)
        .then(rb => {
            const reader = rb.getReader();

            return new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // If there is no more data to read
                            if (done) {
                                console.log('done', done);
                                controller.close();
                                return;
                            }
                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                            // Check chunks by logging to the console
                            console.log(done, value);
                            push();
                        })
                    }

                    push();
                }
            });
        })
        .then(stream => {
            // Respond with our stream
            return new Response(stream, { headers: { "Content-Type": "application/json" } }).text();
        })
        .then(res => {
            res =  JSON.parse(res)

            this.setState({
                [table.name] : res.length
            })
        })
        .catch(err => {
            alert("error fetching Data from the Server, retry again\n"+ err.message)
        })

        return count;
    }

    componentDidMount(props){

        const etudiants = fetch('http://127.0.0.1:5001/api/etudiant');
        this.getCount({"instance" : etudiants, "name": "etudiant"});

        const professeurs = fetch('http://127.0.0.1:5001/api/professeur');
        this.getCount({"instance" : professeurs, "name" : "professeur"});

        const modules = fetch('http://127.0.0.1:5001/api/module');
        this.getCount({"instance" : modules, "name" : "module"});

        //alert("etudiants : " + Etudiants +"\n" + "profs : " + Professeurs + "\n" + "modules : " + Modules)

    }

    render() {
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Overview</li>
                            </ol>

                            <div className="row">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-comments"></i>
                                            </div>
                                            <div className="mr-5">{this.state.etudiant} {this.state.etudiant > 1 ? "étudiants!" : "étudiant!" }</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to={'#'}>
                                            <span className="float-left">Détails ...</span>
                                            <span className="float-right"><i className="fas fa-angle-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-list"></i>
                                            </div>
                                            <div className="mr-5">{this.state.module} {this.state.module > 1 ? "modules!" : "module!" }</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">Détails ...</span>
                                            <span className="float-right"><i className="fas fa-angle-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-shopping-cart"></i>
                                            </div>
                                            <div className="mr-5">{this.state.professeur} {this.state.professeur > 1 ? "professeurs!" : "professeur!" }</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="#">
                                            <span className="float-left">Détails ...</span>
                                            <span className="float-right"><i className="fas fa-angle-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-header">
                                    <i className="fas fa-chart-area"></i>
                                    Area Chart Example
                                </div>
                                <div className="card-body">
                                    <canvas id="myAreaChart" width="100%" height="30"></canvas>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-header">
                                    <i className="fas fa-table"></i>
                                    Data Table Example
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%"
                                               cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td>61</td>
                                                <td>2011/04/25</td>
                                                <td>$320,800</td>
                                            </tr>
                                            <tr>
                                                <td>Garrett Winters</td>
                                                <td>Accountant</td>
                                                <td>Tokyo</td>
                                                <td>63</td>
                                                <td>2011/07/25</td>
                                                <td>$170,750</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>

                        </div>

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

        );
    }
}
