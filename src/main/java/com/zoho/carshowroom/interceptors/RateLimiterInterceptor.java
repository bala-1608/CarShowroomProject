package com.zoho.carshowroom.interceptors;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class RateLimiterInterceptor extends AbstractInterceptor {

	private static final long serialVersionUID = 1L;
	private static Map<String, List<Long>> requestTimes = new HashMap<>();

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {

		HttpServletRequest request = ServletActionContext.getRequest();
		String ip = request.getRemoteAddr();
		if (isAllowed(ip)) {
			return invocation.invoke();
		} else {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setStatus(429);
			response.getWriter().write("Too Many Requests");
			return null;
		}
	}

	private boolean isAllowed(String ip) {

		long now = System.currentTimeMillis();

		List<Long> times = requestTimes.getOrDefault(ip, new ArrayList<>());

		times.removeIf(time -> now - time > 1000);

		times.add(now);

		requestTimes.put(ip, times);

		return times.size() <= 20;
	}

}
