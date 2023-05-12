import ethlogo from './ethlogo.png'

const Concert = () => {
  const BASE_URI = "https://www.bca.co.id/-/media/Feature/News/Edukatips/2022/09/20220912-tips-nonton-konser-pertama-kali-banner.jpg"
  const NEW_URI = "https://img.freepik.com/free-photo/soccer-players-action-professional-stadium_654080-1820.jpg?w=2000"
  const OLD_URI = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOmqYT3GHsLeYJlrewiKqs91XCRd_xeUwBLA&usqp=CAU"
  return (
    <div className="bg-[url('https://gamerwall.pro/uploads/posts/2022-02/1645692873_1-gamerwall-pro-p-kosmos-minimalizm-krasivie-oboi-1.jpg')] bg-no-repeat bg-cover')]">
        <div className="w-4/5 mx-auto">
            <h4 className="text-gradient uppercase text-2xl">Concert </h4>

            <div className="flex flex-wrap justify-start items-center mt-4">
                <div className="relative shadow-xl shadow-black p-3 bg-white
                  rounded-lg w-64 h-64 object-contain bg-no-repeat bg-cover overflow-hidden mr-20 mb-2
                  cursor-pointer transition-all duration-75 delay-100
                  hover:shadow-[#bd255f]}"
                  style={{backgroundImage: `url(${BASE_URI})`}} >
                    <div className="absolute bottom-0 left-0 right-0
                    flex flex-row justify-between items-center
                    label-gradient p-2 w-full text-white text-sm"
                 >
                      <p>
                       Your favourite artist
                      </p>
                  
                      <div className="flex justify-center items-centerspace-x-2">
                          <img className="w-5 cursor-pointer" src={ethlogo}
                            />
                            2
                        
                        </div>

                  </div>
                  
                  <div className='text-white'>Ticket ID: 0</div>
              </div>
              
              <div className="relative shadow-xl shadow-black p-3 bg-white
                  rounded-lg w-64 h-64 object-contain bg-no-repeat bg-cover overflow-hidden mr-20 mb-2
                  cursor-pointer transition-all duration-75 delay-100
                  hover:shadow-[#bd255f]}"
                  style={{backgroundImage: `url(${NEW_URI})`}} >
                    <div className="absolute bottom-0 left-0 right-0
                    flex flex-row justify-between items-center
                    label-gradient p-2 w-full text-white text-sm"
                 >
                      <p>
                       Your favourite football match
                      </p>
                      <div className="flex justify-center items-centerspace-x-2">
                          <img className="w-5 cursor-pointer" src={ethlogo}
                            />
                            1
                        </div>
                  </div>
                  <div className='text-white'>Ticket ID: 200</div>
              </div>
              <div className="relative shadow-xl shadow-black p-3 bg-white
                  rounded-lg w-64 h-64 object-contain bg-no-repeat bg-cover overflow-hidden mr-2 mb-2
                  cursor-pointer transition-all duration-75 delay-100
                  hover:shadow-[#bd255f]}"
                  style={{backgroundImage: `url(${OLD_URI})`}} >
                    <div className="absolute bottom-0 left-0 right-0
                    flex flex-row justify-between items-center
                    label-gradient p-2 w-full text-white text-sm"
                 >
                      <p>
                       Your favourite movie
                      </p>
                      <div className="flex justify-center items-centerspace-x-2">
                          <img className="w-5 cursor-pointer" src={ethlogo}
                            />
                            0.01
                        </div>
                  </div>
                  <div className='text-white'>Ticket ID: 3000</div>
              </div>
               
            
          </div >
      
            

        </div>
    </div>
  )
}

export default Concert