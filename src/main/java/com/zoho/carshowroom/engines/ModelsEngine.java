package com.zoho.carshowroom.engines;

//import com.google.gson.JsonIOException;
//import com.google.gson.JsonObject;
//import com.google.gson.JsonSyntaxException;
import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.dao.ModelDAO;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZModel;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class ModelsEngine extends Engine {
	private List<String> whereColumns;
	private List<String> whereOperators;
	private List<Object> whereValues;
	private List<String> logicalOperators;
	private final ModelDAO modelDAO = new ModelDAO();
	private final DataAccessObject dao = new DataAccessObject();

	

	public Map<String,Object> get(int companyId,int showroomId,Integer modelId,Boolean isAvailable,Boolean isActive)  throws IOException, SQLException {

		
		System.out.println("--------------------------");

		List<Map<String, Object>> data = modelDAO.getModels(companyId,modelId, isActive,showroomId,isAvailable);
		if (!data.isEmpty()) {
			
			return Utility.jsonResponse( 200, "success", data);
		} else {
			return Utility.jsonResponse( 204, "not found", null);
		}

	}

	public Map<String,Object>  post(Map<String, Object> inputData, Map<String, String> parts)
			throws Exception {
		int companyId=0;
		if(parts.containsKey("companies")) {
			companyId=Integer.parseInt(parts.get("companies"));
		}
		

		ZModel model = ZModel.modelCreator(inputData);
		model.setCompanyId(companyId);

		int rowsAffected = Integer.parseInt(dao.create(model,null));

		if (rowsAffected > 0) {
			return Utility.jsonResponse( 200, "car model created successfully", rowsAffected);
		} else {
			return Utility.jsonResponse( 200, "failed", null);
		}
	}

	public Map<String,Object>  put(Map<String, Object> inputData, Map<String, String> parts)
			throws Exception {

		int companyId=0,modelId=0;
		if(parts.containsKey("companies")) {
			companyId=Integer.parseInt(parts.get("companies"));
		}
		
		if(parts.containsKey("models")) {
			modelId=Integer.parseInt(parts.get("models"));
		}

		ZModel model = ZModel.modelCreator(inputData);

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.MODEL, "modelId"),
				TableMapping.getColumnByField(TableMapping.MODEL, "companyId"));
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(modelId, companyId);
		logicalOperators = List.of(Utility.AND);

		int rowsAffected = dao.update(model, whereColumns, whereOperators, whereValues, logicalOperators);

		if (rowsAffected > 0) {
			return Utility.jsonResponse( 200, "car model updated successfully", rowsAffected);
		} else {
			return Utility.jsonResponse( 500, "error updating car model", rowsAffected);
		}

	}

	public Map<String,Object> delete(Map<String, String> parts)
			throws Exception {

		System.out.println("---------- Deleting Model Engine ----------");
		int companyId=0,modelId=0;
		if(parts.containsKey("companies")) {
			companyId=Integer.parseInt(parts.get("companies"));
		}
		
		if(parts.containsKey("models")) {
			modelId=Integer.parseInt(parts.get("models"));
		}

		ZModel modelEngine = new ZModel();
		modelEngine.setActive(false);

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.MODEL, "modelId"),
				TableMapping.getColumnByField(TableMapping.MODEL, "companyId"));
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(modelId, companyId);
		logicalOperators = List.of(Utility.AND);

		int updatedRows = dao.deactivate(modelEngine, whereColumns, whereOperators, whereValues, logicalOperators,
				null);

		if (updatedRows > 0) {
			System.out.println("Model deactivated successfully");
			return Utility.jsonResponse(200, "model deleted successfully", updatedRows);
		} else {
			return Utility.jsonResponse( 200, "car model not found ", updatedRows);
		}
	}

}
