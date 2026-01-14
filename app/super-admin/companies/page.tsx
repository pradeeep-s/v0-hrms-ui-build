import { Suspense } from "react"
import CompaniesContent from "./companies-content"
import Loading from "./loading"

export default function CompaniesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CompaniesContent />
    </Suspense>
  )
}
