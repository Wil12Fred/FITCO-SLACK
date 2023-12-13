import { FC } from "react";
export const ChannelCardContainer: FC<any> = ({
  item,
  set_channel,
  userData,
}) => {
  return (
    <>
      <li className="active" key={item.channelId.toString()} onClick={() => set_channel(userData, item)}>
        <a href="#">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1 overflow-hidden">
              <h5 className="text-truncate font-size-14 mb-1"># {item.name}</h5>
              <p className="text-truncate mb-0">Hey! there I'm available</p>
            </div>
            <div className="flex-shrink-0">
              <div className="font-size-11">02 min</div>
            </div>
          </div>
        </a>
      </li>
    </>
  );
};
