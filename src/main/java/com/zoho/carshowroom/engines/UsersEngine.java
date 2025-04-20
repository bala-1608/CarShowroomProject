package com.zoho.carshowroom.engines;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;


import com.zoho.carshowroom.context.SessionContext;
import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.enums.UserRole;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZSession;

public class UsersEngine  extends Engine{
	
	public Map<String,Object>  get() throws SQLException {
		
		DataAccessObject dao =new DataAccessObject();
		ZSession session =SessionContext.get();
		int userId=session.getUserId();
		
		

		List<String> columns = List.of(Utility.ALL_COLUMNS); 

		List<String> whereColumns = List.of(TableMapping.getColumnByField(TableMapping.USER,"userId"));
		List<String> whereOperators = List.of(Utility.EQUAL);
		List<Object> whereValues = List.of(userId); 

		

		List<Map<String, Object>> result = dao.fetchRecords(TableMapping.USER.getTableName(), null,
				columns, null, null, null, whereColumns, whereOperators, whereValues,
				null, null, null, 
				null, 
				false, null);
		int rol=(int)result.get(0).get("role");
		String role=UserRole.fromValue(rol);
	    result.get(0).put("role",role);
	    
	    if(role.equals("admin")) {
	    	
	    	columns = List.of("brand_code");
	    	whereColumns = List.of(TableMapping.getColumnByField(TableMapping.COMPANY,"adminId"));
			whereOperators = List.of(Utility.EQUAL);
			whereValues = List.of(userId);
			
	    	List<Map<String, Object>> data = dao.fetchRecords(TableMapping.COMPANY.getTableName(), null,
					columns, null, null, null, whereColumns, whereOperators, whereValues,
					null, null, null, 
					null, 
					false, null);
	    	result.get(0).putAll( data.get(0));
	    	
	    	
	    }
		if(role.equals("manager")) {
			
			columns = List.of("name AS showroom_name","showroom_id","company_id");
	    	whereColumns = List.of(TableMapping.getColumnByField(TableMapping.SHOWROOM,"managerId"));
			whereOperators = List.of(Utility.EQUAL);
			whereValues = List.of(userId);
			
			List<Map<String, Object>> data = dao.fetchRecords(TableMapping.SHOWROOM.getTableName(), null,
					columns, null, null, null, whereColumns, whereOperators, whereValues,
					null, null, null, 
					null, 
					false, null);
			if(!data.isEmpty()) {
				result.get(0).putAll( data.get(0));
			}
			
	    	
		}
		
		
	    return Utility.jsonResponse( 200, "success",result);
		
	}

}
