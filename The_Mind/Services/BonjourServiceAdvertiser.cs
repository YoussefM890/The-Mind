// using The_Mind.Models.Enums;
//
// namespace The_Mind.Services;
//
// using System;
// using System.Runtime.InteropServices;
//
// public class BonjourServiceAdvertiser
// {
//     [DllImport("dnssd.dll", EntryPoint = "DNSServiceRegister", CallingConvention = CallingConvention.Cdecl)]
//     private static extern DNSServiceErrorType DNSServiceRegister(ref IntPtr sdRef,
//                                                                   DNSServiceFlags flags,
//                                                                   uint interfaceIndex,
//                                                                   [MarshalAs(UnmanagedType.LPStr)] string serviceName,
//                                                                   [MarshalAs(UnmanagedType.LPStr)] string regtype,
//                                                                   [MarshalAs(UnmanagedType.LPStr)] string domain,
//                                                                   [MarshalAs(UnmanagedType.LPStr)] string host,
//                                                                   ushort port,
//                                                                   ushort txtLen,
//                                                                   byte[] txtRecord,
//                                                                   IntPtr callBack,
//                                                                   IntPtr context);
//
//     // Example method to register a service
//     public void RegisterService()
//     {
//         IntPtr serviceRef = IntPtr.Zero;
//         string serviceName = "My Game Server";
//         string serviceType = "_mygame._tcp"; // Example service type
//         ushort port = htons(12345); // Your game server port, converted to network byte order
//
//         DNSServiceErrorType error = DNSServiceRegister(ref serviceRef, 0, 0, serviceName, serviceType, null, null, port, 0, null, IntPtr.Zero, IntPtr.Zero);
//         
//         if (error == DNSServiceErrorType.kDNSServiceErr_NoError)
//         {
//             Console.WriteLine("Service registered successfully.");
//             // Keep the application running to maintain the service advertisement
//             Console.ReadLine();
//         }
//         else
//         {
//             Console.WriteLine($"Error registering service: {error}");
//         }
//     }
//
//     private static ushort htons(ushort hostshort)
//     {
//         byte[] bytes = BitConverter.GetBytes(hostshort);
//         if (BitConverter.IsLittleEndian)
//         {
//             Array.Reverse(bytes);
//         }
//         return BitConverter.ToUInt16(bytes, 0);
//     }
// }
//
// // Enum for DNSServiceErrorType and DNSServiceFlags as per the Bonjour SDK documentation
//
