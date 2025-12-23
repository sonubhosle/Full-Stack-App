


export default function AdminHeading({heading,subheading}){
    return(
         <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{heading}</h1>
        <p className="text-slate-600 text-sm sm:text-base">{subheading}</p>
      </div> 
    )
}
