import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom'
import config from '../../../config.json'

export default function OrderHistory() {
	const state = useContext(GlobalState);
	const [history] = state.userAPI.history;

	return (
		<div className="container" style={{marginTop:'80px'}}>
			<div className="row">
				<div className="col-md-12 text-center">
					<h3 className="display-3">OrderHistory</h3>
					<h4 className="text-success"> You have { history.length } Orders. </h4>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="table table-responsive">
						<table className="table table-bordered table-hover table-striped">
							<thead>
								<tr>
									<th>Payment ID</th>
									<th>Date of Purchased</th>
									<th>Created At</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{
									history.map((item,key) => {
										return (
											<tr key={key}>
												<td> {item.paymentID } </td>
												<td> { new Date(item.createdAt).toLocaleDateString()  } </td>
												<td> { new Date(item.createdAt).toLocaleTimeString()  } </td>
												<td>
													<Link to={`/history/${item._id}`} className="btn btn-sm btn-outline-primary">
														View
													</Link>
												</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
