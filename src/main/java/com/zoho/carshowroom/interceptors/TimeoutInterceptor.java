//package com.zoho.carshowroom.interceptors;
//
//import java.util.concurrent.Callable;
//import java.util.concurrent.ExecutorService;
//import java.util.concurrent.Executors;
//import java.util.concurrent.Future;
//import java.util.concurrent.TimeUnit;
//import java.util.concurrent.TimeoutException;
//
//import com.opensymphony.xwork2.ActionInvocation;
//import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
//
//public class TimeoutInterceptor extends AbstractInterceptor{
//
//	 private static final long serialVersionUID = 1L;
//	 private static final long TIMEOUT_SECONDS = 20;
//
//	@Override
//	public String intercept(ActionInvocation invocation) throws Exception {
//		
//		ExecutorService executor = Executors.newSingleThreadExecutor();
//
//        Callable<String> task = () -> invocation.invoke(); 
//
//        Future<String> future = executor.submit(task);
//
//        try {
//            return future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);
//        } catch (TimeoutException e) {
//            System.out.println("Request timed out.");
//            return "error"; 
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("Action execution failed");
//        } finally {
//            executor.shutdownNow(); 
//        }
//	}
//
//}
//package com.zoho.carshowroom.interceptors;
//
//import java.util.concurrent.Callable;
//import java.util.concurrent.ExecutorService;
//import java.util.concurrent.Executors;
//import java.util.concurrent.Future;
//import java.util.concurrent.TimeUnit;
//import java.util.concurrent.TimeoutException;
//
//import com.opensymphony.xwork2.ActionInvocation;
//import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
//import com.opensymphony.xwork2.ActionContext;
//import org.apache.struts2.ServletActionContext;
//
//public class TimeoutInterceptor extends AbstractInterceptor {
//
//    private static final long serialVersionUID = 1L;
//    private static final long TIMEOUT_SECONDS = 20;
//
//    @Override
//    public String intercept(ActionInvocation invocation) throws Exception {
//       
//        ActionContext context = invocation.getInvocationContext();
//        ExecutorService executor = Executors.newSingleThreadExecutor();
//
//        Callable<String> task = new Callable<String>() {
//        	public String call() throws Exception {
//                try {
//                    // Invoke the action and return the result
//                    return invocation.invoke();
//                } catch (Exception e) {
//                    // Log any exception and return a default value or rethrow
//                    e.printStackTrace();
//                    return null; // You could also choose to return a specific error string
//                }
//            }
//        };
//
//        
//        Future<String> future = executor.submit(task);
//
//        try {
//            // Wait for the task to complete or timeout
//            String result = future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);
//
//            // Check if the result is null (indicating a failure in the task)
//            if (result == null) {
//                System.out.println("The task result is null. Action might have failed.");
//                return "error"; // Return an appropriate error result
//            }
//            
//            return future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);
//        } catch (TimeoutException e) {
//            
//            System.out.println("Request timed out.");
//            
//            
//            ServletActionContext.getResponse().setStatus(408); 
//            ServletActionContext.getResponse().getWriter().write("Request timed out. Please try again later.");
//            return "error";  
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("Action execution failed");
//        } finally {
//            executor.shutdownNow(); 
//        }
//    }
//}

