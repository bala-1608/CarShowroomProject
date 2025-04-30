package com.zoho.carshowroom.interceptors;

import com.zoho.carshowroom.context.SessionContext;
import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.enums.UserRole;
import com.zoho.carshowroom.models.ZSession;
import com.zoho.carshowroom.util.RolePermissions;
import com.zoho.carshowroom.util.Utility;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.SQLException;
import java.util.*;

public class ValidationInterceptor extends AbstractInterceptor {

    private static final long serialVersionUID = 1L;
	private final DataAccessObject dao = new DataAccessObject();
	private Map<String, Object> jsonResponse;

    public String intercept(ActionInvocation invocation) throws Exception {
    	
    	
    	
        HttpServletRequest req = ServletActionContext.getRequest();
        HttpServletResponse res = ServletActionContext.getResponse();
        String method = req.getMethod().toUpperCase();
        String uri = req.getRequestURI();
        String[] parts = uri.split("/");
        Map<String, String> paths = Utility.partsToMap(parts);

        String sessionId = getSessionIdFromCookies(req);
        if (sessionId == null) {
            setJsonResponse(Utility.jsonResponse(401, "Un Authorized", null));
            Utility.sendResponse(res, jsonResponse);
            return "error";
        }

        ZSession session = getSessionFromDB(sessionId);
        if (session == null) {
        	setJsonResponse(Utility.jsonResponse(401, "Un Authorized", null));
        	Utility.sendResponse(res, jsonResponse);
            return "error";
        }

        SessionContext.set(session);
        String roleId = UserRole.fromValue(session.getRoleId());
        int userID = session.getUserId();
        

        if (!RolePermissions.hasAccess(roleId, method, uri)) {
        	setJsonResponse(Utility.jsonResponse(401, "Un Authorized", null));
        	Utility.sendResponse(res, jsonResponse);
            return "error";
        }

        if (!validateEntities(paths, roleId, userID, method)) {
        	setJsonResponse(Utility.jsonResponse(401, "Un Authorized", null));
        	Utility.sendResponse(res, jsonResponse);
            return "error"; 
        }

        return invocation.invoke();
    }

    private String getSessionIdFromCookies(HttpServletRequest req) {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("sessionId".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private ZSession getSessionFromDB(String sessionId) {
        List<String> whereColumns = List.of(TableMapping.getColumnByField(TableMapping.SESSION, "sessionId"));
        List<String> whereOperators = List.of(Utility.EQUAL);
        List<Object> whereValues = List.of(sessionId);

        try {
            List<Map<String, Object>> data = dao.fetchRecords(
                    TableMapping.SESSION.getTableName(), null, new ArrayList<>(), null,
                    null, null, whereColumns, whereOperators, whereValues,
                    null, null, null, null, false, null);
            if (data == null || data.isEmpty()) {
                return null;
            }
            return ZSession.sessionCreator(data.get(0));
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private boolean validateEntities(Map<String, String> paths, String roleId, int userId, String method) throws SQLException {
        int companyId = 0;

        if (paths.containsKey("companies")) {
            companyId = Integer.parseInt(paths.get("companies"));
            if (!"app admin".equals(roleId)) {
                if (!isValidCompany(companyId, null)) {
                    return false;
                }
            }
        }

        if (paths.containsKey("showrooms")) {
            int showroomId = Integer.parseInt(paths.get("showrooms"));
            if (!isValidShowroom(companyId, showroomId, null, method)) {
                return false;
            }
        }

        if (paths.containsKey("models")) {
            int modelId = Integer.parseInt(paths.get("models"));
            if (!isValidModel(companyId, modelId)) {
                return false;
            }
        }

        return true;
    }

    private boolean isValidCompany(int companyId, Integer adminId) throws SQLException {
        List<String> whereColumns = new ArrayList<>(List.of(
                TableMapping.getColumnByField(TableMapping.COMPANY, "isActive"),
                TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode")
        ));
        List<String> whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
        List<Object> whereValues = List.of(true, companyId);
        List<String> logicalOperators = List.of(Utility.AND);

        if (adminId != null) {
            whereColumns.add(TableMapping.getColumnByField(TableMapping.COMPANY, "adminId"));
            whereOperators.add(Utility.EQUAL);
            whereValues.add(adminId);
            logicalOperators.add(Utility.AND);
        }

        return dao.fetchRecords(TableMapping.COMPANY.getTableName(), null, new ArrayList<>(), null, null, null,
                whereColumns, whereOperators, whereValues, logicalOperators,
                null, null, null, false, null).size() > 0;
    }

    private boolean isValidShowroom(int companyId, int showroomId, Integer managerId, String method) throws SQLException {
        List<String> whereColumns = new ArrayList<>(List.of(
                TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"),
                TableMapping.getColumnByField(TableMapping.SHOWROOM, "isActive")
        ));
        List<String> whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
        List<Object> whereValues = List.of(showroomId, method.length() > 0);
        List<String> logicalOperators = List.of(Utility.AND);

        if (managerId != null) {
            whereColumns.add(TableMapping.getColumnByField(TableMapping.SHOWROOM, "managerId"));
            whereOperators.add(Utility.EQUAL);
            whereValues.add(managerId);
            logicalOperators.add(Utility.AND);
        }

        return dao.fetchRecords(TableMapping.SHOWROOM.getTableName(), null,
                List.of(TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId")), null,
                new ArrayList<>(), null, whereColumns, whereOperators, whereValues,
                logicalOperators, null, null, null, false, null)
                .stream().anyMatch(result -> (int) result.get(TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId")) == companyId);
    }

    private boolean isValidModel(int companyId, int modelId) throws SQLException {
        List<String> whereColumns = List.of(
                TableMapping.getColumnByField(TableMapping.MODEL, "modelId"),
                TableMapping.getColumnByField(TableMapping.MODEL, "isActive")
        );
        List<String> whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
        List<Object> whereValues = List.of(modelId, true);

        return dao.fetchRecords(TableMapping.MODEL.getTableName(), null, new ArrayList<>(), null,
                null, null, whereColumns, whereOperators, whereValues,
                List.of(Utility.AND), null, null, null, false, null).size() > 0;
    }

	public Map<String, Object> getJsonResponse() {
		return jsonResponse;
	}

	public void setJsonResponse(Map<String, Object> jsonResponse) {
		this.jsonResponse = jsonResponse;
	}
    
}

