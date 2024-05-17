



*Improvements*

 BACKEND
 - The step linking providers to transaction is very brute force. With time a more elegant solution could be written that would not need to call the DB list each time
 - caculateSpend cannot handle transactions being handled in more than one currency
 - Using toPrecision() in providerHelper could lead to pence being lost in rounding
 - Searching for provider name cannot handle misspellings in the description such as GIFGAFF
 - Error handling should be improved for the above scenario
 - both intergration and unit test need to be fleshed out fro psuedo code

 FE
 -Convert currency names to the matching symbol
 -Pagination buttons could be made into arrow svgs and show disabled when you cannot go further in one direction
 - Sorting of transactions was not implemented
 - Styling could be made more consistent with provider name appearing beside the logo and larger
 - Date and price field could be listed in a table
 - Transacted between could become MONTH / YY - MONTH / YY
 - Snapshot tests and storybook stories added for components
 - Tests added to test API link
 - On transaction details click could be made smoother with an animation css rule OR show transaction details on hover