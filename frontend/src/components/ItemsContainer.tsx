import { useItems } from 'core/hooks';
import { BarLoader } from 'react-spinners';

export default function ItemsContainer() {
  const getProducts = useItems();
  const photoProducts = getProducts.data ?? [];

  if (getProducts.isLoading) {
    return (
      <div className="flex w-100">
        <BarLoader height={8} width="100%" />
      </div>
    );
  }

  return (
    <div className="w-100">
      <div className="flex flex-wrap product-grid pt2">
        {photoProducts.map((photoProduct) => {
          return (
            <div key={photoProduct.id} className="w-100 w-50-l ph3">
              <a className="link black hover-light-purple" href="/t">
                <div className="flex flex-column h-100">
                  <img
                    style={{ objectFit: 'cover', height: '420px' }}
                    alt=""
                    loading="lazy"
                    className="img flex-auto bg-gray"
                    src={require(`../images/${photoProduct.id}.jpg`)}
                  />

                  <div className="pt3 pb5 flex flex-column">
                    <b className="mb1">{photoProduct.id}</b>
                    <i className="mb3 gray">{photoProduct.category}</i>
                    <i className="mb3 gray">{photoProduct.extra ? JSON.stringify(photoProduct.extra) : '{}'}</i>
                    <p className="ma0 b black">{photoProduct.orderCount}</p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
