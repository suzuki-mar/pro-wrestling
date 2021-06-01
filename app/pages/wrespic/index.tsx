import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Wrespic } from "../../wrespic/components/wrespic"

const style = {
  height: "550px",
}

const WrespicsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Wrespics</title>
      </Head>

      <Wrespic />
    </>
  )
}

WrespicsPage.authenticate = false
WrespicsPage.getLayout = (page) => <Layout>{page}</Layout>

export default WrespicsPage
