package com.zoho.carshowroom.engines;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import org.postgresql.util.PSQLException;


//import org.postgresql.util.PSQLException;

import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZAddress;
import com.zoho.carshowroom.models.ZUsers;

public class RegisterEngine {

	private final DataAccessObject dao= new DataAccessObject();
	

	public Map<String,Object>  post(ZUsers user,ZAddress address) throws Exception {
		
		int userId = 0,addressId=0;
		try {

			address.setStreet(Utility.format(address.getStreet()));
			address.setCity(Utility.format(address.getCity()));
			

			// searching address already available
			List<Map<String, Object>> data = dao.getAdminAddressId(address);
			if (data.isEmpty()) {
				addressId = Integer.parseInt(dao.create(address, null));
			} else {
				addressId = (int) data.get(0).get(TableMapping.getColumnByField(TableMapping.ADDRESS, "addressId"));
			}

			
			user.setAddressId(addressId);
			user.setPassword(Utility.HashPassword(user.getPassword()));

			userId = Integer.parseInt(dao.create(user,null));
			if (userId > 0) {
				List<Map<String, Object>> userData = new ArrayList<>(List.of( Map.of("user_id", userId,"address_id",addressId)));
				return Utility.jsonResponse( 200, "success", userData);
			} else {
				return Utility.jsonResponse( 404, "failed", null);
				
			}

		} catch (PSQLException e) {
			e.printStackTrace();
			return Utility.jsonResponse( 403, "email exist", null);
		}
	}
}
