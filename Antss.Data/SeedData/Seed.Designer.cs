﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Antss.Data.SeedData {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "17.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Seed {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Seed() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("Antss.Data.SeedData.Seed", typeof(Seed).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to [{&quot;description&quot;:&quot;sit amet, consectetuer adipiscing elit. Curabitur sed tortor.&quot;},{&quot;description&quot;:&quot;Maecenas libero est, congue a, aliquet vel, vulputate eu, odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum&quot;},{&quot;description&quot;:&quot;et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus&quot;},{&quot;description&quot;:&quot;et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string TicketsJson {
            get {
                return ResourceManager.GetString("TicketsJson", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to [
        ///	{
        ///		&quot;firstName&quot;: &quot;Acton&quot;,
        ///		&quot;lastName&quot;: &quot;Figueroa&quot;,
        ///		&quot;emailAddress&quot;: &quot;a_figueroa@foo.com&quot;,
        ///		&quot;contactNumber&quot;: &quot;0988 131 8378&quot;
        ///	},
        ///	{
        ///		&quot;firstName&quot;: &quot;Zephr&quot;,
        ///		&quot;lastName&quot;: &quot;Gray&quot;,
        ///		&quot;emailAddress&quot;: &quot;zephr.gray@foo.com&quot;,
        ///		&quot;contactNumber&quot;: &quot;056 8736 7358&quot;
        ///	},
        ///	{
        ///		&quot;firstName&quot;: &quot;Risa&quot;,
        ///		&quot;lastName&quot;: &quot;Marquez&quot;,
        ///		&quot;emailAddress&quot;: &quot;rmarquez4200@foo.com&quot;,
        ///		&quot;contactNumber&quot;: &quot;07254 830824&quot;
        ///	},
        ///	{
        ///		&quot;firstName&quot;: &quot;Nigel&quot;,
        ///		&quot;lastName&quot;: &quot;Bryan&quot;,
        ///		&quot;emailAddress&quot;: &quot;n.bryan@foo.com&quot;,
        ///		&quot;contactNumber&quot;: &quot;0800 221 550 [rest of string was truncated]&quot;;.
        /// </summary>
        internal static string UsersJson {
            get {
                return ResourceManager.GetString("UsersJson", resourceCulture);
            }
        }
    }
}