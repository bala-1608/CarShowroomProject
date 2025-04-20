package com.zoho.carshowroom.actions;

import com.opensymphony.xwork2.config.ConfigurationManager;
import com.zoho.carshowroom.util.Utility;

import org.apache.struts2.dispatcher.mapper.DefaultActionMapper;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.dispatcher.mapper.ActionMapping;

public class CustomActionMapper extends DefaultActionMapper {
	@Override
	public ActionMapping getMapping(HttpServletRequest request, ConfigurationManager configManager) {

		ActionMapping mapping = super.getMapping(request, configManager);
		String uri = request.getRequestURI();
		String[] parts = uri.split("/");
		int size = parts.length;
		if (Utility.isInteger(parts[size - 1])) {
			mapping.getParams().put("companyId",parts[size-1]);
			mapping.setName(parts[size - 2]);
			return mapping;
		}
		System.out.println("------------------------------------------------------");

		if (mapping != null && mapping.getName() != null) {
			if (size > 5) {

				Map<String, String> dynamicParams = new HashMap<>();

				for (int i = 0; i < size - 1; i++) {
					String key = parts[i];
					String idParamName = isEntity(key);

					if (!idParamName.equals("false")) {

						if (i + 1 >= size) {
							break;
						}
						String idValue = parts[i + 1];

						if (idValue.matches("\\d+")) {

							dynamicParams.put(idParamName, idValue);
							System.out.println("Extracted " + idParamName + " = " + idValue);
						}
					}
				}

				if (mapping.getParams() == null) {
					mapping.setParams(new HashMap<>());
				}

				mapping.getParams().putAll(dynamicParams);

			}

		}

//        if (mapping != null && mapping.getName() != null) {
//            String originalName = mapping.getName();
//            String capitalizedName;
//           
//            System.out.println(originalName.matches("companies/\\d+/showrooms"));
//            if (originalName.matches("companies/\\d+/showrooms")) {
//              
//                mapping.setName("companies/*/showrooms");
//
//                
//                String[] parts = originalName.split("/");
//                if (parts.length >= 3) {
//                    mapping.getParams().put("companyId", parts[1]);
//                }
//                System.out.println("params: "+ mapping.getParams());
//            }
//            System.out.println("original name : "+ originalName);
//            int size=originalName.length();
//            if(originalName.contains("ies")) {
//            	capitalizedName= originalName.substring(0, 1).toUpperCase() + originalName.substring(1,size-3)+"y";
//                mapping.setName(capitalizedName);
//                System.out.println("captilized name : "+capitalizedName);
//                System.out.println("------------------------------------------------------");
//                return mapping;
//            }
//            else if(originalName.charAt(size-1)=='s') {
//
//            	capitalizedName= originalName.substring(0, 1).toUpperCase() + originalName.substring(1,size-1);
//                mapping.setName(capitalizedName);
//                System.out.println("captilized name : "+capitalizedName);
//                System.out.println("------------------------------------------------------");
//                return mapping;
//            }
//           System.out.println("original name : "+ originalName);
//            capitalizedName = originalName.substring(0, 1).toUpperCase() + originalName.substring(1);
//            mapping.setName(capitalizedName);
//            System.out.println("captilized name : "+capitalizedName);
//        }
		System.out.println("------------------------------------------------------");
		return mapping;
	}

	private String isEntity(String pathSegment) {

		switch (pathSegment) {
		case "companies":
			return "companyId";
		case "showrooms":
			return "showroomId";
		case "users":
			return "userId";
		case "models":
			return "modelId";
		case "bookings":
			return "bookingId";
		case "cars":
			return "carId";

		default:
			return "false";
		}

	}

}
