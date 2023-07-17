import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function HoveredButton() {
  const renderTooltip = (props:any) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="success">Hover me to see</Button>
    </OverlayTrigger>
  );
}

export default HoveredButton;



// function showPopover(event:any) {
    //     const line = event.target;
        
    //     // Calculate the popover position (adjust this according to your needs)
    //     const popoverX = event.clientX;
    //     const popoverY = event.clientY;
        
    //     // Create the popover element
    //     const popover = document.createElement('div');
    //     popover.classList.add('popover');
        
    //     // Position the popover
    //     popover.style.left = `${popoverX}px`;
    //     popover.style.top = `${popoverY}px`;
        
    //     // Set popover content (adjust this according to your needs)
    //     popover.innerHTML = 'Popover content';
        
    //     // Append the popover to the document body
    //     document.body.appendChild(popover);
    // }
    
    // function hidePopover(event:any) {
    //     const popover = document.querySelector('.popover');
        
    //     // Remove the popover from the document body
    //     if (popover) {
    //     popover.remove();
    //     }
    // }