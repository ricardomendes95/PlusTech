import React, { useEffect, useRef } from 'react'
import { AiOutlinePrinter } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useHistory, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { Menu } from '../../components'
import { ComponentToPrint } from '../../components/Pdf'
import { Definitions } from '../../core/types'
import { ContributorService } from '../../services'

import * as S from './style'
interface PrintParams {
  id: string
}
export default function PrintPdf() {
  const componentRef = useRef()
  const history = useHistory()
  const params = useParams<PrintParams>()

  // const [item, setItem] = useState<ContributorAttributes>()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  async function loadContributor(): Promise<void> {
    try {
      const { data } = await ContributorService.findByPK(Number(params?.id))
      console.log(params.id, data)

      // setItem(data)
    } catch (error) {
      console.log(error)
    }
  }

  const item: Definitions['Contributor'] = {
    id: 1,
    name: 'ricardo teste',
    email: 'teste@email.com',
    admissionDate: new Date(),
    wallet: 'asdasdasdjjjjj12000--sdaasd0s0e12',
  }

  useEffect(() => {
    loadContributor()
  })
  return (
    <Menu>
      <div>
        <S.Action>
          <a onClick={() => history.goBack()}>
            <IoMdArrowRoundBack size={30} />
          </a>
          <S.Print type="primary" onClick={handlePrint}>
            Imprimir
            <AiOutlinePrinter size={20} />
          </S.Print>
        </S.Action>
        <S.Content>
          <ComponentToPrint ref={componentRef} item={item} />
        </S.Content>
      </div>
    </Menu>
  )
}
