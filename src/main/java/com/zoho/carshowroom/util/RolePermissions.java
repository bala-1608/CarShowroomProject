
package com.zoho.carshowroom.util;

import java.util.*;

public class RolePermissions {
	private static final Map<String, Map<String, Set<String>>> ROLE_PERMISSIONS = new HashMap<>();
	private static final List<String> AVAILABLE_RESOURCES = List.of("companies","bookings","showrooms","reports","cars","users","models");
	static {
			
		ROLE_PERMISSIONS.put("app admin",
				Map.of("companies", Set.of("POST", "GET", "PUT", "DELETE"),
						"showrooms", Set.of("GET"),
						"models", Set.of("GET"),
						"bookings",Set.of("POST", "GET"),
						"cars", Set.of("GET", "POST"),
						"users", Set.of("GET")));

		ROLE_PERMISSIONS.put("admin", 
				Map.of("companies", Set.of("GET"),
				"showrooms",Set.of("POST", "GET", "PUT", "DELETE"),
				"models", Set.of("POST", "GET", "PUT"),
				"bookings",Set.of("POST", "GET"),
				"cars", Set.of("GET", "POST"),
				"users", Set.of("GET"))
				);

		ROLE_PERMISSIONS.put("manager", Map.of("companies", Set.of("GET"),
				"cars", Set.of("POST", "GET", "PUT"),
				"reports", Set.of("GET"),
				"showrooms", Set.of("GET"),
				"bookings", Set.of("GET", "PUT","POST"),
				"models", Set.of("GET"),
				"users", Set.of("GET")
				));

		ROLE_PERMISSIONS.put("customer",
				Map.of("companies", Set.of("GET"), 
						"showrooms", Set.of("GET"),
						"models", Set.of("GET"),
						"bookings",Set.of("POST", "GET"),
						"cars", Set.of("GET", "POST"),
						"users", Set.of("GET", "POST")
				));
	}

	public static boolean hasAccess(String role, String method, String endpoint) {
		System.out.println("------------------------------------------");
		System.out.println(role + ":" + method + ":" + endpoint);
		
		String resource = extractResource(endpoint);
		System.out.println("Extracted Resource: " + resource);
		
		if(!AVAILABLE_RESOURCES.contains(resource)) {
			System.out.println("Resources : " + "not found" );
			return false;
		}

		boolean access = ROLE_PERMISSIONS.getOrDefault(role, Collections.emptyMap())
				.getOrDefault(resource, Collections.emptySet()).contains(method);

		System.out.println("Access Allowed: " + access);
		System.out.println("------------------------------------------");
		return access;
	}

	private static String extractResource(String endpoint) {
		String[] parts = endpoint.split("/");
		if (parts.length < 2)
			return ""; 
		int  index=parts.length-1;
		if( Utility.isInteger(parts[index])) {
			index=parts.length-2;
		}

		return parts[index].replaceAll("\\{.*?\\}|\\d+", ""); // Normalize by removing IDs
	}
}
