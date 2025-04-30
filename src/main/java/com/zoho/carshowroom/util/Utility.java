package com.zoho.carshowroom.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.Date;
//import java.lang.reflect.InvocationTargetException;
//import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

import com.zoho.carshowroom.context.SessionContext;

//import com.zoho.carshowroom.pojo.ZUsers;

public class Utility {
	public static final String AND = "AND";
	public static final String OR = "OR";
	public static final String EQUAL = "=";
	public static final String NOT_EQUAL = "!=";
	public static final String GREATER_THAN = ">";
	public static final String LESS_THAN = "<";
	public static final String GREATER_THAN_OR_EQUAL = ">=";
	public static final String LESS_THAN_OR_EQUAL = "<=";
	public static final String ALL_COLUMNS = "*";
	public static final String DISTINCT = "DISTINCT";

	public static String camelToSnake(String camelCase) {
		Utility.checkNull(camelCase);
		return camelCase.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
	}

	public static void checkNull(Object str) {
		if (str == null || str.equals("")) {
			throw new NullPointerException();
		}
	}

	public static void onlyCheckNull(Object obj) {
		if (Objects.isNull(obj)) {
			throw new NullPointerException();
		}

	}

	public static void boundaryCheck(Integer num) {
		if (num != null) {
			if (num < 0) {
				throw new IllegalArgumentException("Integer Must be greater than zero");
			}
		}
	}

	public static void boundaryCheck(Short num) {
		if (num != null) {
			if (num < 0) {
				throw new IllegalArgumentException("Integer Must be greater than zero");
			}
		}
	}

	public static void boundaryCheck(Long num) {
		if (num != null) {
			if (num < 0) {
				throw new IllegalArgumentException("TimeStamp Must be greater than zero");
			}
		}
	}

	public static String format(String str) {
		return str.trim().replaceAll("\\s{2,}", " ").toLowerCase();
	}

	public static boolean isNull(Object str) {
		if (str == null) {
			return true;
		}
		return false;
	}

	public static String stringToJson(String... str) {
		JSONArray jsonArray = new JSONArray();
		jsonArray.put(str);
		return jsonArray.toString();
	}

	public static Map<String, Object> fromJsonToMap(String reader) throws IOException {
	
		if(reader==null) {
			return null;
		}
		try {
			JSONObject jsonObject = new JSONObject(reader);
			Map<String, Object> map = new HashMap<>();
			Iterator<String> keys = jsonObject.keys();
			while (keys.hasNext()) {
				String key = keys.next();
				map.put(key, jsonObject.get(key));
			}
			return map;
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	public static String capitalize(String str) {
		Utility.checkNull(str);
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	}

	public static String HashPassword(String pass) {
		Utility.checkNull(pass);
		return BCrypt.hashpw(pass, BCrypt.gensalt(12));
	}

	public static boolean checkPassword(String original, String hashed) {
		Utility.checkNull(original);
		Utility.checkNull(hashed);
		return BCrypt.checkpw(original, hashed);
	}

	public static boolean isInteger(String str) {
		Utility.checkNull(str);
		try {
			Integer.parseInt(str);
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	public static Map<String, String> partsToMap(String[] parts) {
		Map<String, String> paths = new HashMap<>();
		for (int i = 0; i < parts.length - 1; i++) {
			paths.put(parts[i], parts[++i]);
		}
		return paths;
	}

	public static String parseReader(BufferedReader reader) throws IOException {
		checkNull(reader);
		StringBuilder sb = new StringBuilder();
		String line;
		while ((line = reader.readLine()) != null) {
			sb.append(line).append("\n");
		}
		return sb.toString();
	}

	public static Map<String, String> createMapping(Class<?> clazz) {
		Utility.checkNull(clazz);
		Map<String, String> mapping = new HashMap<>();
		Field[] fields = clazz.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			String val = camelToSnake(field.getName());
			mapping.put(field.getName(), val);
		}
		return mapping;
	}

	public static boolean hasPermission(HttpSession session, String requiredRole) {
		System.out.println(session.getAttribute("role"));
		String userRole = (String) session.getAttribute("role");
		return userRole != null && userRole.equals(requiredRole);
	}

	public static void checkValidDate(Date date) {
		try {
			Utility.checkNull(date);
			if (date.after(new Date())) {
				throw new IllegalArgumentException("Invalid date.");
			}

		} catch (DateTimeParseException e) {
			throw new IllegalArgumentException("Invalid date format. Expected format: yyyy-MM-dd");
		}
	}
	
	public static Map<String, Object> jsonResponse( int status, String message, Object data) {

		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("status", status);
		responseMap.put("message", message);

		if (data != null) {
			responseMap.put("data", data);
		}
		System.out.println(responseMap);
		return responseMap;
	}
	public static void sendResponse(HttpServletResponse resp, Map<String,Object> responseMap) {

		try {
			
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");
			System.out.println("in"+responseMap);
			resp.setStatus((int) responseMap.get("status"));
			SessionContext.clear();
			resp.getWriter().flush();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String mapToJson(Map<String, Object> responseMap) {
		JSONObject jsonString = new JSONObject(responseMap);
		return jsonString.toString();
	}

	public static Date convertStringToDate(String dateStr) throws ParseException {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date = formatter.parse(dateStr);
		return date;
	}

	    public static Map<String, Object> convertQueryParams(Map<String, String[]> queryParams) {
	        Map<String, Object> params = new HashMap<>();
	        for (Map.Entry<String, String[]> entry : queryParams.entrySet()) {
	            if (entry.getValue().length == 1) {
	                params.put(entry.getKey(), entry.getValue()[0]); // Single value
	            } else {
	                params.put(entry.getKey(), Arrays.asList(entry.getValue())); // Multiple values as list
	            }
	        }
	        return params;
	    }

	    public static String UUIDGenerator() {
	    	
	    	SecureRandom random = new SecureRandom();
	        byte[] bytes = new byte[16];
	        random.nextBytes(bytes);
	        BigInteger id = new BigInteger(1, bytes);
	        System.out.println("Random 128-bit ID: " );
	    	return id.toString(16);
	    }

}
//	public static Object validator (Object obj) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, InstantiationException, NoSuchMethodException, SecurityException {
//		Class<? > clazz=obj.getClass();
//		Field[] field = clazz.getDeclaredFields();
//		for(Field fd : field) {
//			fd.setAccessible(true);
//			String methodName=settersMethod(fd.getName());
//			Object serviceInstance = clazz.getDeclaredConstructor().newInstance();
//			Method method = clazz.getMethod(methodName,fd.getType());
//			method.setAccessible(true);
//			method.invoke(serviceInstance, fd.get(obj));
//		}
//		return obj;
//	}
//	private static String settersMethod (String fieldName) {
//		Utility.checkNull(fieldName);
//		StringBuilder str =new StringBuilder();
//	    return str.append("set").append(fieldName.substring(0,1).toUpperCase()).append(fieldName.substring(1)).toString();
//	}
