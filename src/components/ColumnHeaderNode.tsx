import type { NodeProps, Node } from '@xyflow/react';

export interface ColHeaderData extends Record<string, unknown> {
  anio: number | string;
}

export type ColHeaderNodeType = Node<ColHeaderData, 'col-header'>;

export function ColumnHeaderNode({ data }: NodeProps<ColHeaderNodeType>) {
  return (
    <div className="col-header-node">
      {data.anio == 'CBC'? (
        <span className='col-header-year'>CBC</span>
      ):(
        <span className="col-header-year">{data.anio}° Año</span>
      )}
    </div>
  );
}
